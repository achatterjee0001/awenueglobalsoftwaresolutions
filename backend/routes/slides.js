const express = require('express');
const router = express.Router();
const Slide = require('../models/Slide');
const auth = require('../middleware/auth');

// @route   GET /api/slides
// @desc    Get all slideshow slides (ordered by display order ascending)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const slides = await Slide.find({}).sort({ order: 1, createdAt: 1 });
    res.json(slides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving slideshow list' });
  }
});

// @route   POST /api/slides
// @desc    Create a new slideshow slide (Admin only)
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, subtitle, image, destination, link, order } = req.body;

    if (!title || !subtitle || !image || !destination) {
      return res.status(400).json({ message: 'Title, subtitle, image URL, and destination are required.' });
    }

    const newSlide = new Slide({
      title,
      subtitle,
      image,
      destination,
      link: link || '/catalog',
      order: order !== undefined ? Number(order) : 0
    });

    const savedSlide = await newSlide.save();
    res.status(201).json(savedSlide);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating slide listing' });
  }
});

// @route   PUT /api/slides/:id
// @desc    Update slide details (Admin only)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, subtitle, image, destination, link, order } = req.body;

    let slide = await Slide.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    if (title !== undefined) slide.title = title;
    if (subtitle !== undefined) slide.subtitle = subtitle;
    if (image !== undefined) slide.image = image;
    if (destination !== undefined) slide.destination = destination;
    if (link !== undefined) slide.link = link;
    if (order !== undefined) slide.order = Number(order);

    const updatedSlide = await slide.save();
    res.json(updatedSlide);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating slide details' });
  }
});

// @route   DELETE /api/slides/:id
// @desc    Delete a slideshow slide (Admin only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    await Slide.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slide deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting slide' });
  }
});

module.exports = router;
