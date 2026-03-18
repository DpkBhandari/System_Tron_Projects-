const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const calcRoutes = require('./routes/calculations');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use('/api', calcRoutes);
app.get('/api/health', (_, res) => res.json({ status: 'OK' }));
app.use((err, req, res, next) => res.status(500).json({ success: false, message: err.message }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/calculator')
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5003;
    app.listen(PORT, () => console.log(`🚀 Calculator API on port ${PORT}`));
  })
  .catch(err => { console.error('❌', err.message); process.exit(1); });
