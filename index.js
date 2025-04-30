const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const parcelRoutes = require('./routes/parcels');

// Load environment variables from .env
dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/parcels', parcelRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Nairobi Parcel Delivery Platform API!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});