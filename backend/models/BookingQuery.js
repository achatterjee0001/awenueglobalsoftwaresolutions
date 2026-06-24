const mongoose = require('mongoose');

const BookingQuerySchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: true,
    trim: true,
  },
  contactDetails: {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    }
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    default: null, // Optional for custom requests
  },
  isCustomRequest: {
    type: Boolean,
    default: false,
  },
  metadata: {
    location: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    },
    browserData: {
      type: String,
      default: 'Unknown Browser / OS',
    },
    sessionDurationMs: {
      type: Number,
      default: 0,
    },
    inferredPreferences: {
      type: [String],
      default: []
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BookingQuery', BookingQuerySchema);
