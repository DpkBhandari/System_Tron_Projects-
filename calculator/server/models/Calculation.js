const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  expression: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  result: {
    type: String,
    required: true
  },
  isError: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['basic', 'scientific'],
    default: 'basic'
  }
}, { timestamps: true });

calculationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Calculation', calculationSchema);
