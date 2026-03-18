const Watchlist = require('../models/Watchlist');

// @desc    Get user watchlist
// @route   GET /api/watchlist
exports.getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, watchlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add to watchlist
// @route   POST /api/watchlist
exports.addToWatchlist = async (req, res) => {
  try {
    const { movieId, title, overview, poster_path, backdrop_path, vote_average, release_date, media_type } = req.body;

    const existing = await Watchlist.findOne({ user: req.user.id, movieId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Already in your list' });
    }

    const item = await Watchlist.create({
      user: req.user.id,
      movieId, title, overview, poster_path, backdrop_path, vote_average, release_date,
      media_type: media_type || 'movie'
    });

    res.status(201).json({ success: true, message: 'Added to My List', item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove from watchlist
// @route   DELETE /api/watchlist/:movieId
exports.removeFromWatchlist = async (req, res) => {
  try {
    const item = await Watchlist.findOneAndDelete({
      user: req.user.id,
      movieId: req.params.movieId
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in your list' });
    }

    res.json({ success: true, message: 'Removed from My List' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Check if movie is in watchlist
// @route   GET /api/watchlist/check/:movieId
exports.checkWatchlist = async (req, res) => {
  try {
    const item = await Watchlist.findOne({ user: req.user.id, movieId: req.params.movieId });
    res.json({ success: true, inList: !!item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
