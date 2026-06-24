const express = require('express');
const router = express.Router();
const BookingQuery = require('../models/BookingQuery');
const auth = require('../middleware/auth');

// @route   POST /api/queries
// @desc    Submit a visitor booking query or custom package request along with telemetry metadata
router.post('/', async (req, res) => {
  try {
    const { visitorName, contactDetails, packageId, isCustomRequest, metadata } = req.body;

    if (!visitorName || !contactDetails || !contactDetails.email || !contactDetails.phone) {
      return res.status(400).json({ message: 'Name, email, and phone contact details are required.' });
    }

    const newQuery = new BookingQuery({
      visitorName,
      contactDetails,
      packageId: packageId || null,
      isCustomRequest: !!isCustomRequest,
      metadata: metadata || {}
    });

    const savedQuery = await newQuery.save();
    
    // If populated with a package, return with package details
    let responseQuery = savedQuery;
    if (savedQuery.packageId) {
      responseQuery = await BookingQuery.findById(savedQuery._id).populate('packageId');
    }

    res.status(201).json({
      success: true,
      message: isCustomRequest 
        ? 'Your custom travel inquiry has been received. Our Customer Care team will follow up shortly!' 
        : 'Your package booking inquiry has been recorded. We will contact you soon!',
      data: responseQuery
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error saving booking query' });
  }
});

// @route   GET /api/queries
// @desc    Retrieve all booking queries and leads with metadata (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const queries = await BookingQuery.find({})
      .populate('packageId', 'title price destination')
      .sort({ createdAt: -1 });

    res.json(queries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving queries' });
  }
});

module.exports = router;
