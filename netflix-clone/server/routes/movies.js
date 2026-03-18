const express = require('express');
const { getTrending, getMoviesByCategory, getMovieDetails, searchMovies, getBanner } = require('../controllers/movieController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/trending', protect, getTrending);
router.get('/banner', protect, getBanner);
router.get('/search', protect, searchMovies);
router.get('/details/:id', protect, getMovieDetails);
router.get('/:category', protect, getMoviesByCategory);

module.exports = router;
