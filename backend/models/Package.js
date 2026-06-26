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
  days: {
    type: Number,
    default: 1,
  },
  nights: {
    type: Number,
    default: 0,
  },
  duration: {
    type: String,
    default: 'N/A',
  },
  durationOptions: [{
    nights: { type: Number, required: true },
    days: { type: Number, required: true },
    price: { type: Number, required: true } // Price for 1 person
  }],
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

// Pre-save middleware to dynamically determine price, duration & isAffordable
PackageSchema.pre('save', function (next) {
  if (this.durationOptions && this.durationOptions.length > 0) {
    // Set base package default price & duration from the first option
    const defaultOpt = this.durationOptions[0];
    this.price = defaultOpt.price;
    this.nights = defaultOpt.nights;
    this.days = defaultOpt.days;
    this.duration = `${defaultOpt.nights} Nights / ${defaultOpt.days} Days`;
  } else {
    // Construct duration label automatically for legacy packages
    if (this.days !== undefined && this.nights !== undefined) {
      this.duration = `${this.nights} Nights / ${this.days} Days`;
    }
  }

  // Customizable price threshold for affordable classification
  const affordableBaseline = Number(process.env.AFFORDABLE_BASELINE_PRICE) || 1500;
  this.isAffordable = this.price < affordableBaseline;
  next();
});

module.exports = mongoose.model('Package', PackageSchema);
