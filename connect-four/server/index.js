const express    = require('express');
const http       = require('http');
const { Server } = require('socket.io');
const mongoose   = require('mongoose');
const cors       = require('cors');
const dotenv     = require('dotenv');

dotenv.config();

const { createBoard, dropPiece, checkWin, isBoardFull } = require('./utils/gameLogic');
const Game = require('./models/Game');
const gameRoutes = require('./routes/games');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:3000', methods: ['GET','POST'] }
});

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/games', gameRoutes);
app.get('/api/health', (_, res) => res.json({ status: 'OK' }));

// In-memory rooms: { roomId -> { board, currentPlayer, players: [{id, name}], startTime, moves } }
const rooms = {};

io.on('connection', (socket) => {
  console.log('🔌 Connected:', socket.id);

  /* ─── JOIN ROOM ─── */
  socket.on('joinRoom', ({ roomId, playerName }) => {
    const room = rooms[roomId] || {
      board: createBoard(), currentPlayer: 1,
      players: [], startTime: Date.now(), moves: 0
    };

    if (room.players.length >= 2) {
      socket.emit('error', { message: 'Room is full' });
      return;
    }

    const playerNum = room.players.length + 1;
    room.players.push({ id: socket.id, name: playerName || `Player ${playerNum}`, num: playerNum });
    rooms[roomId] = room;

    socket.join(roomId);
    socket.emit('joined', { playerNum, roomId });

    if (room.players.length === 2) {
      io.to(roomId).emit('gameStart', {
        board: room.board,
        currentPlayer: room.currentPlayer,
        players: room.players.map(p => ({ num: p.num, name: p.name }))
      });
    } else {
      socket.emit('waiting', { message: 'Waiting for opponent…' });
    }
  });

  /* ─── DROP PIECE ─── */
  socket.on('dropPiece', async ({ roomId, col }) => {
    const room = rooms[roomId];
    if (!room) return;

    const player = room.players.find(p => p.id === socket.id);
    if (!player || player.num !== room.currentPlayer) return;

    const result = dropPiece(room.board, col, room.currentPlayer);
    if (!result.success) { socket.emit('error', { message: 'Column full' }); return; }

    room.moves++;
    const win  = checkWin(room.board, room.currentPlayer);
    const draw = !win.won && isBoardFull(room.board);

    io.to(roomId).emit('boardUpdate', {
      board: room.board,
      lastMove: { row: result.row, col },
      currentPlayer: room.currentPlayer,
      winCells: win.cells || null
    });

    if (win.won || draw) {
      const winnerName = win.won ? player.name : null;
      io.to(roomId).emit('gameOver', {
        winner: win.won ? room.currentPlayer : null,
        winnerName,
        isDraw: draw,
        winCells: win.cells || null
      });

      // Save to DB
      try {
        const duration = Math.round((Date.now() - room.startTime) / 1000);
        await Game.create({
          roomId: `${roomId}_${Date.now()}`,
          player1: room.players[0]?.name || 'Player 1',
          player2: room.players[1]?.name || 'Player 2',
          winner: draw ? 'draw' : `player${room.currentPlayer}`,
          moves: room.moves, duration, status: 'finished', board: room.board
        });
      } catch(e) { console.error('DB save error:', e.message); }

      delete rooms[roomId];
    } else {
      room.currentPlayer = room.currentPlayer === 1 ? 2 : 1;
    }
  });

  /* ─── RESET ─── */
  socket.on('resetGame', ({ roomId }) => {
    if (rooms[roomId]) {
      rooms[roomId].board = createBoard();
      rooms[roomId].currentPlayer = 1;
      rooms[roomId].moves = 0;
      rooms[roomId].startTime = Date.now();
      io.to(roomId).emit('gameReset', { board: rooms[roomId].board, currentPlayer: 1 });
    }
  });

  /* ─── DISCONNECT ─── */
  socket.on('disconnect', () => {
    for (const [roomId, room] of Object.entries(rooms)) {
      const idx = room.players.findIndex(p => p.id === socket.id);
      if (idx !== -1) {
        io.to(roomId).emit('playerLeft', { message: 'Opponent disconnected' });
        delete rooms[roomId];
      }
    }
  });
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/connect-four')
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5002;
    server.listen(PORT, () => console.log(`🚀 Connect Four on port ${PORT}`));
  })
  .catch(err => { console.error('❌', err.message); process.exit(1); });
