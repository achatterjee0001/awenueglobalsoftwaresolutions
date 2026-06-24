const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  // About Page Customisation
  aboutHeroTitle: {
    type: String,
    default: 'Our Journey, Your Adventure',
  },
  aboutHeroSubtitle: {
    type: String,
    default: 'A Legacy of Exploration',
  },
  aboutDescription: {
    type: String,
    default: 'At Avenue Global T&T, we believe travel is not just about visiting new coordinates—it is about creating customized memories that endure a lifetime. Since our founding, we have curated bespoke expeditions across India and globally.',
  },
  aboutTrustTitle: {
    type: String,
    default: 'A Brand You Can Trust',
  },
  aboutTrustDescription1: {
    type: String,
    default: 'Avenue Global T&T was born out of a desire to simplify travel. We recognized that generic travel itineraries fail to satisfy modern travelers. That is why we developed a customizable ecosystem, combining standard holiday templates with our smart recommendation engine to customize tour plans to your exact interest footprint.',
  },
  aboutTrustDescription2: {
    type: String,
    default: 'Whether you are booking a corporate stay at our Taj hotels partner network, taking a custom bike run through Kashmir, or setting up a family beach holiday in Goa, our team operates with elite precision to guarantee a premium experience.',
  },
  
  // Contact Details
  phoneNumber: {
    type: String,
    default: '+91 98765 43210',
  },
  phoneFallbackNumber: {
    type: String,
    default: '+91 12345 67890',
  },
  emailAddress: {
    type: String,
    default: 'info@avenueglobaltravels.com',
  },
  address: {
    type: String,
    default: 'Block A, Connaught Place, New Delhi, 110001, India',
  },
  instagramUrl: {
    type: String,
    default: 'https://instagram.com',
  },
  facebookUrl: {
    type: String,
    default: 'https://facebook.com',
  },
  whatsappUrl: {
    type: String,
    default: 'https://wa.me/919876543210',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', SettingsSchema);
