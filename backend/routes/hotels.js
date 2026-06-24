const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const auth = require('../middleware/auth');

// @route   GET /api/hotels
// @desc    Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find({}).sort({ createdAt: -1 });
    res.json(hotels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving hotels network' });
  }
});

// @route   POST /api/hotels
// @desc    Create a new hotel listing (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, location, description, pricePerNight, rating, imageUrl, amenities } = req.body;

    if (!name || !location || !pricePerNight) {
      return res.status(400).json({ message: 'Name, location, and price per night are required.' });
    }

    const newHotel = new Hotel({
      name,
      location,
      description,
      pricePerNight,
      rating,
      imageUrl,
      amenities: Array.isArray(amenities) ? amenities : amenities ? amenities.split(',').map(a => a.trim()) : undefined
    });

    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating hotel listing' });
  }
});

// @route   PUT /api/hotels/:id
// @desc    Update hotel details (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, location, description, pricePerNight, rating, imageUrl, amenities } = req.body;

    let hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    if (name !== undefined) hotel.name = name;
    if (location !== undefined) hotel.location = location;
    if (description !== undefined) hotel.description = description;
    if (pricePerNight !== undefined) hotel.pricePerNight = pricePerNight;
    if (rating !== undefined) hotel.rating = rating;
    if (imageUrl !== undefined) hotel.imageUrl = imageUrl;
    if (amenities !== undefined) {
      hotel.amenities = Array.isArray(amenities) ? amenities : amenities.split(',').map(a => a.trim());
    }

    const updatedHotel = await hotel.save();
    res.json(updatedHotel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating hotel listing' });
  }
});

// @route   DELETE /api/hotels/:id
// @desc    Delete a hotel listing (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hotel listing deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting hotel listing' });
  }
});

module.exports = router;
