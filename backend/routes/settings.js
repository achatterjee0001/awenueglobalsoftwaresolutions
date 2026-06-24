const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

// @route   GET /api/settings
// @desc    Get current site settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // If settings don't exist, create default Settings doc
      settings = new Settings({});
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving settings' });
  }
});

// @route   PUT /api/settings
// @desc    Update site settings
// @access  Admin-only (Private)
router.put('/', auth, async (req, res) => {
  try {
    const {
      aboutHeroTitle,
      aboutHeroSubtitle,
      aboutDescription,
      aboutTrustTitle,
      aboutTrustDescription1,
      aboutTrustDescription2,
      phoneNumber,
      phoneFallbackNumber,
      emailAddress,
      address,
      instagramUrl,
      facebookUrl,
      whatsappUrl
    } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    if (aboutHeroTitle !== undefined) settings.aboutHeroTitle = aboutHeroTitle;
    if (aboutHeroSubtitle !== undefined) settings.aboutHeroSubtitle = aboutHeroSubtitle;
    if (aboutDescription !== undefined) settings.aboutDescription = aboutDescription;
    if (aboutTrustTitle !== undefined) settings.aboutTrustTitle = aboutTrustTitle;
    if (aboutTrustDescription1 !== undefined) settings.aboutTrustDescription1 = aboutTrustDescription1;
    if (aboutTrustDescription2 !== undefined) settings.aboutTrustDescription2 = aboutTrustDescription2;
    
    if (phoneNumber !== undefined) settings.phoneNumber = phoneNumber;
    if (phoneFallbackNumber !== undefined) settings.phoneFallbackNumber = phoneFallbackNumber;
    if (emailAddress !== undefined) settings.emailAddress = emailAddress;
    if (address !== undefined) settings.address = address;
    if (instagramUrl !== undefined) settings.instagramUrl = instagramUrl;
    if (facebookUrl !== undefined) settings.facebookUrl = facebookUrl;
    if (whatsappUrl !== undefined) settings.whatsappUrl = whatsappUrl;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating settings' });
  }
});

module.exports = router;
