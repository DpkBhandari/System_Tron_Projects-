const Game = require('../models/Game');

exports.getHistory = async (req, res) => {
  try {
    const games = await Game.find({ status: 'finished' })
      .sort({ createdAt: -1 }).limit(20).select('-board');
    res.json({ success: true, games });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const total    = await Game.countDocuments({ status: 'finished' });
    const p1Wins   = await Game.countDocuments({ winner: 'player1' });
    const p2Wins   = await Game.countDocuments({ winner: 'player2' });
    const draws    = await Game.countDocuments({ winner: 'draw' });
    const avgMoves = await Game.aggregate([
      { $match: { status: 'finished' } },
      { $group: { _id: null, avg: { $avg: '$moves' } } }
    ]);
    res.json({ success: true, stats: { total, p1Wins, p2Wins, draws, avgMoves: Math.round(avgMoves[0]?.avg || 0) } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
