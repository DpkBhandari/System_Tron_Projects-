const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  roomId:   { type: String, required: true, unique: true },
  player1:  { type: String, default: 'Player 1' },
  player2:  { type: String, default: 'Player 2' },
  winner:   { type: String, default: null },          // 'player1' | 'player2' | 'draw'
  moves:    { type: Number, default: 0 },
  duration: { type: Number, default: 0 },             // seconds
  status:   { type: String, enum: ['ongoing', 'finished'], default: 'finished' },
  board:    { type: [[Number]], default: () => Array.from({ length: 6 }, () => Array(7).fill(0)) }
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
