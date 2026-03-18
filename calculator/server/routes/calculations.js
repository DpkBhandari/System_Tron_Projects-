const express = require('express');
const { calculate, getHistory, deleteEntry, clearHistory } = require('../controllers/calculationController');
const router = express.Router();

router.post('/calculate', calculate);
router.get('/history',    getHistory);
router.delete('/history', clearHistory);
router.delete('/history/:id', deleteEntry);

module.exports = router;
