const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    default: 'N/A', // e.g. "5 Days / 4 Nights"
  },
  destination: {
    type: String,
    default: 'General',
  },
  category: {
    type: String,
    enum: ['Tour', 'Holiday'],
    default: 'Tour',
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  isAffordable: {
    type: Boolean,
    default: true,
  },
  itinerary: [{
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  highlights: {
    type: [String],
    default: []
  },
  bookingPolicy: {
    type: String,
    default: ''
  },
  cancellationPolicy: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Pre-save middleware to dynamically determine isAffordable
PackageSchema.pre('save', function (next) {
  // Customizable price threshold for affordable classification
  const affordableBaseline = Number(process.env.AFFORDABLE_BASELINE_PRICE) || 1500;
  this.isAffordable = this.price < affordableBaseline;
  next();
});

module.exports = mongoose.model('Package', PackageSchema);
