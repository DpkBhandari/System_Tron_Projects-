# 🔴🟡 Connect Four — Full Stack MERN + Socket.io

A stunning Connect Four game with real-time multiplayer via Socket.io and match history stored in MongoDB.

## Features
- Beautiful animated game board
- 2-player local game with custom names
- Win detection: horizontal, vertical, both diagonals
- Animated drop & win-flash effects
- Score tracking per session
- Match history stored in MongoDB
- Real-time multiplayer via Socket.io (room-based)
- Responsive design

## Tech Stack
- **Frontend**: React 18, Tailwind CSS, Socket.io-client
- **Backend**: Node.js, Express, Socket.io, MongoDB/Mongoose
- **Font**: Orbitron (gaming aesthetic)

## Setup

### Backend
```bash
cd server
npm install
cp .env.example .env
# Edit MONGODB_URI
npm run dev        # runs on port 5002
```

### Frontend
```bash
cd client
npm install
npm start          # runs on port 3000
```

## Multiplayer (Socket.io)
The server supports room-based multiplayer:
- Players join a room with a `roomId`
- Socket events: `joinRoom`, `dropPiece`, `resetGame`
- Server broadcasts: `gameStart`, `boardUpdate`, `gameOver`, `gameReset`, `playerLeft`

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/games/history | Last 20 finished games |
| GET | /api/games/stats | Win/draw statistics |
