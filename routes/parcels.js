const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Parcel = require('../models/Parcel');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Create a new parcel
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, details } = req.body;

    const parcel = new Parcel({
      sender: req.user.id,
      pickupLocation,
      dropoffLocation,
      details,
    });

    await parcel.save();
    res.status(201).json({ message: 'Parcel created successfully', parcel });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.get('/my-parcels', authenticateToken, async (req, res) => {
    try {
      const parcels = await Parcel.find({ sender: req.user.id });
      res.status(200).json(parcels);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  // Update parcel status (for delivery persons)
router.put('/update-status/:id', authenticateToken, async (req, res) => {
    try {
      const { status } = req.body;
      const parcelId = req.params.id;
  
      // Ensure the user is a delivery person
      if (req.user.role !== 'delivery') {
        return res.status(403).json({ message: 'Only delivery persons can update parcel status' });
      }
  
      const parcel = await Parcel.findById(parcelId);
      if (!parcel) {
        return res.status(404).json({ message: 'Parcel not found' });
      }
  
      // Update the status and delivery person
      parcel.status = status;
      parcel.deliveryPerson = req.user.id;
      await parcel.save();
  
      res.status(200).json({ message: 'Parcel status updated successfully', parcel });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  

module.exports = router;