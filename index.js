const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Debug: Log the MONGODB_URI to verify it's correct
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Nairobi Parcel Delivery Platform API!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});