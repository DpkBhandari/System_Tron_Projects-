const express = require('express');
const { getWatchlist, addToWatchlist, removeFromWatchlist, checkWatchlist } = require('../controllers/watchlistController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.get('/check/:movieId', checkWatchlist);
router.delete('/:movieId', removeFromWatchlist);

module.exports = router;
