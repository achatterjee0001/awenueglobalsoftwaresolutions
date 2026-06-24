const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  subtitle: {
    type: String,
    required: [true, 'Subtitle is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  destination: {
    type: String,
    required: [true, 'Destination location is required'],
    trim: true,
  },
  link: {
    type: String,
    default: '/catalog',
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Slide', SlideSchema);
