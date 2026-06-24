const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// @route   GET /api/reviews
// @desc    Get all reviews (newest first)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving reviews' });
  }
});

// @route   POST /api/reviews
// @desc    Create a new review
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, rating, comment, designation } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({ message: 'Name, rating, and comment are required' });
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    }

    const newReview = new Review({
      name,
      rating: numericRating,
      comment,
      designation: designation || 'Verified Traveler'
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error saving review' });
  }
});

module.exports = router;
