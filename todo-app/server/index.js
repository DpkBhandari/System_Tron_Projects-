const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.get('/api/health', (_, res) => res.json({ status: 'OK' }));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Server Error' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5001, () => console.log(`🚀 Todo API on port ${process.env.PORT || 5001}`));
  })
  .catch(err => { console.error('❌ MongoDB error:', err.message); process.exit(1); });
