const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const auth = require('../middleware/auth');

// @route   GET /api/packages
// @desc    Get all packages with filtering capabilities
router.get('/', async (req, res) => {
  try {
    const { destination, maxPrice, duration, isAffordable, category } = req.query;
    let query = {};

    // Category filter
    if (category) {
      query.category = category;
    }

    // Destination filter (case insensitive regex)
    if (destination) {
      query.destination = { $regex: destination, $options: 'i' };
    }

    // Maximum Price filter
    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }

    // Duration filter (case insensitive search)
    if (duration) {
      query.duration = { $regex: duration, $options: 'i' };
    }

    // Affordable filter
    if (isAffordable !== undefined) {
      query.isAffordable = isAffordable === 'true';
    }

    const packages = await Package.find(query).sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving packages' });
  }
});

// @route   GET /api/packages/recommended
// @desc    Algorithmic package recommendation based on visitor preferences & telemetry context
router.get('/recommended', async (req, res) => {
  try {
    // Read preferences, location, or budget hints from headers or query params
    const prefHeader = req.headers['x-inferred-preferences'] || req.query.preferences || '';
    const countryHeader = req.headers['x-location-country'] || req.query.country || '';
    const maxPriceHeader = req.headers['x-preferred-max-price'] || req.query.maxPrice || '';

    // Parse user preference terms
    const preferences = prefHeader
      ? prefHeader.split(',').map(p => p.trim().toLowerCase()).filter(Boolean)
      : [];

    const maxPrice = maxPriceHeader ? Number(maxPriceHeader) : null;

    // Fetch all available packages
    const packages = await Package.find({});

    // Score and rank packages based on visitor's context
    const scoredPackages = packages.map(pkg => {
      let score = 0;
      const titleLower = pkg.title.toLowerCase();
      const descLower = pkg.description.toLowerCase();
      const destLower = pkg.destination.toLowerCase();

      // 1. Preference keywords matching (in title, description, or destination)
      preferences.forEach(pref => {
        if (destLower.includes(pref)) {
          score += 15; // Strong match on destination preference
        } else if (titleLower.includes(pref) || descLower.includes(pref)) {
          score += 5; // Moderate match in title/description
        }
      });

      // 2. Budget preference match
      if (maxPrice) {
        if (pkg.price <= maxPrice) {
          score += 8; // Package falls within user's active budget limit
        } else {
          score -= 5; // Negative weight for exceeding preference limit
        }
      }

      // 3. Location affinity match (e.g. promoting domestic or specific gateway packages if location matches)
      if (countryHeader && destLower.includes(countryHeader.toLowerCase())) {
        score += 10;
      }

      return {
        pkg,
        score
      };
    });

    // Sort by recommendation score in descending order
    scoredPackages.sort((a, b) => b.score - a.score);

    // Map back to just package schema objects
    const recommendations = scoredPackages.map(item => item.pkg);

    // Return recommendations (capped at a customizable limit, e.g. 6)
    const limit = Number(req.query.limit) || 6;
    res.json(recommendations.slice(0, limit));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error generating recommendations' });
  }
});

// @route   POST /api/packages
// @desc    Create a new travel package (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { 
      title, description, price, destination, 
      imageUrl, category, itinerary, highlights, 
      bookingPolicy, cancellationPolicy,
      durationOptions
    } = req.body;

    let computedPrice = price;
    if (durationOptions && durationOptions.length > 0) {
      computedPrice = Number(durationOptions[0].price || 0);
    }

    if (!title || !computedPrice) {
      return res.status(400).json({ message: 'Title and price (or duration options) are required' });
    }

    const newPackage = new Package({
      title,
      description,
      price: computedPrice,
      destination,
      category,
      imageUrl,
      itinerary,
      highlights,
      bookingPolicy,
      cancellationPolicy,
      durationOptions: durationOptions || []
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating package' });
  }
});

// @route   PUT /api/packages/:id
// @desc    Update a travel package (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { 
      title, description, price, destination, 
      imageUrl, category, itinerary, highlights, 
      bookingPolicy, cancellationPolicy,
      durationOptions
    } = req.body;

    let pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Update fields
    if (title !== undefined) pkg.title = title;
    if (description !== undefined) pkg.description = description;
    if (destination !== undefined) pkg.destination = destination;
    if (category !== undefined) pkg.category = category;
    if (imageUrl !== undefined) pkg.imageUrl = imageUrl;
    if (itinerary !== undefined) pkg.itinerary = itinerary;
    if (highlights !== undefined) pkg.highlights = highlights;
    if (bookingPolicy !== undefined) pkg.bookingPolicy = bookingPolicy;
    if (cancellationPolicy !== undefined) pkg.cancellationPolicy = cancellationPolicy;

    // Update duration options
    if (durationOptions !== undefined) {
      pkg.durationOptions = durationOptions;
    }

    // Update price fallback
    if (price !== undefined) {
      pkg.price = price;
    }

    const updatedPackage = await pkg.save();
    res.json(updatedPackage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating package' });
  }
});

// @route   DELETE /api/packages/:id
// @desc    Delete a travel package (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting package' });
  }
});

module.exports = router;
