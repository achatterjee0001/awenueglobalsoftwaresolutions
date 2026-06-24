const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Retrieve customizable admin configuration from environment
  const targetUsername = process.env.ADMIN_USERNAME || 'admin';
  const targetPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_change_me';
  const tokenExpiry = process.env.JWT_EXPIRY || '24h';

  if (username === targetUsername && password === targetPassword) {
    try {
      // Find or create admin user in the database
      const adminEmail = process.env.EMAIL_USER || 'admin@avenueglobal.com';
      let adminUser = await User.findOne({ email: adminEmail });
      if (!adminUser) {
        // Create the admin record
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(targetPassword, salt);
        adminUser = new User({
          name: 'Administrator',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin',
          isVerified: true,
          authProvider: 'local'
        });
        await adminUser.save();
      } else if (adminUser.role !== 'admin') {
        // Promote existing user to admin in the database to align with admin portal credentials
        adminUser.role = 'admin';
        await adminUser.save();
      }

      // Generate JWT with database id
      const token = jwt.sign(
        { id: adminUser._id, username: targetUsername, role: 'admin' },
        jwtSecret,
        { expiresIn: tokenExpiry }
      );

      return res.status(200).json({
        success: true,
        token,
        message: 'Admin login successful'
      });
    } catch (err) {
      console.error('Admin DB setup / JWT sign failed:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid administrator credentials'
    });
  }
});

// Verify token route (helps frontend check status quickly)
router.get('/verify', (req, res) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ valid: false });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ valid: false });

  try {
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET || 'fallback_secret_key_change_me');
    return res.json({ valid: true, admin: decoded });
  } catch (err) {
    return res.status(401).json({ valid: false });
  }
});

module.exports = router;
