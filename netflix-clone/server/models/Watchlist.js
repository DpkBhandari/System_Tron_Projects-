const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: Number,
    required: true
  },
  title: { type: String, required: true },
  overview: { type: String },
  poster_path: { type: String },
  backdrop_path: { type: String },
  vote_average: { type: Number },
  release_date: { type: String },
  media_type: {
    type: String,
    enum: ['movie', 'tv'],
    default: 'movie'
  }
}, { timestamps: true });

// Compound index to prevent duplicates
watchlistSchema.index({ user: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
