const express = require('express');
const { getHistory, getStats } = require('../controllers/gameController');
const router = express.Router();
router.get('/history', getHistory);
router.get('/stats', getStats);
module.exports = router;
