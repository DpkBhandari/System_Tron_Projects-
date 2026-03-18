const { Parser } = require('expr-eval');
const Calculation = require('../models/Calculation');

const parser = new Parser();

// Safe evaluate — no eval(), uses expr-eval
const safeEval = (expression) => {
  // Normalise display symbols
  let expr = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, String(Math.PI))
    .replace(/e(?![0-9])/g, String(Math.E));

  const result = parser.evaluate(expr);

  if (!isFinite(result)) throw new Error('Result is not finite');
  if (isNaN(result))     throw new Error('Not a number');

  // Round floating-point noise (e.g. 0.1+0.2)
  const rounded = parseFloat(result.toPrecision(12));
  return String(rounded);
};

// POST /api/calculate
exports.calculate = async (req, res) => {
  try {
    const { expression } = req.body;
    if (!expression?.trim()) return res.status(400).json({ success: false, message: 'Expression required' });

    let result, isError = false;
    try {
      result = safeEval(expression);
    } catch (err) {
      result  = err.message.includes('divide') || expression.includes('/0') ? 'Cannot divide by zero' : 'Error';
      isError = true;
    }

    const calc = await Calculation.create({ expression, result, isError });
    res.json({ success: true, result, isError, id: calc._id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/history
exports.getHistory = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const calcs = await Calculation.find({ isError: false }).sort({ createdAt: -1 }).limit(limit);
    res.json({ success: true, history: calcs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/history/:id
exports.deleteEntry = async (req, res) => {
  try {
    const calc = await Calculation.findByIdAndDelete(req.params.id);
    if (!calc) return res.status(404).json({ success: false, message: 'Entry not found' });
    res.json({ success: true, message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/history
exports.clearHistory = async (req, res) => {
  try {
    await Calculation.deleteMany({});
    res.json({ success: true, message: 'History cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
