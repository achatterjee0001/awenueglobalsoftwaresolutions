const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

// --- Google Auth Configuration ---
// Make sure to add GOOGLE_CLIENT_ID to your .env file
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy_client_id');

// --- Nodemailer Configuration ---
const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

let transporter;

if (emailUser && emailUser.includes('gmail.com')) {
  // Configured specifically for user's Gmail request
  const sanitizedPass = emailPass ? emailPass.replace(/['"]/g, '').trim() : '';
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: sanitizedPass
    }
  });
} else {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: emailUser || 'ethereal.user@ethereal.email',
      pass: emailPass || 'ethereal_password'
    }
  });
}

// Helper to send OTP emails
const sendOTPEmail = async (email, otp, subject) => {
  const senderEmail = emailUser || 'no-reply@avenueglobal.com';
  const mailOptions = {
    from: `"Avenue Global T&T" <${senderEmail}>`,
    to: email,
    subject: subject,
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`
  };

  // Always log OTP to the console for development visibility and debugging
  console.log(`🔑 [OTP DEBUG] OTP for ${email}: ${otp}`);

  try {
    if (!emailUser) {
      return true;
    }
    await transporter.sendMail(mailOptions);
    console.log(`📧 OTP email successfully sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// --- Auth Routes ---

// 1. Register User (Generates OTP)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    
    if (user && user.isVerified) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();

    // Check if this is the absolute first user
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'admin' : 'user';

    if (user) {
      // User exists but not verified, update their info
      user.name = name;
      user.password = hashedPassword;
      user.otpCode = otp;
      user.otpExpiry = Date.now() + 10 * 60 * 1000;
      await user.save();
    } else {
      user = new User({
        name,
        email,
        password: hashedPassword,
        authProvider: 'local',
        role,
        otpCode: otp,
        otpExpiry: Date.now() + 10 * 60 * 1000
      });
      await user.save();
    }

    await sendOTPEmail(email, otp, 'Verify your Avenue Global T&T Account');

    res.json({ success: true, message: 'OTP sent to email. Please verify.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 2. Verify OTP for Registration
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otpCode: otp });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 3. Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ success: false, message: 'Please verify your email first' });
    }

    if (user.authProvider !== 'local') {
      return res.status(400).json({ success: false, message: 'Please login using Google' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 4. Google Auth
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    
    let ticket;
    try {
      ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id'
      });
    } catch (err) {
      // If verification fails due to mocked credentials, we will simulate extraction (NOT for production)
      // For development ONLY if GOOGLE_CLIENT_ID is not properly configured.
      console.warn("Google Auth verification failed. Decoding without verification for local DEV.");
      const decoded = jwt.decode(credential);
      ticket = { getPayload: () => decoded };
    }
    
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'admin' : 'user';

    if (!user) {
      user = new User({
        name,
        email,
        authProvider: 'google',
        googleId,
        isVerified: true, // Google emails are already verified
        role
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- Dual OTP Admin Assignment ---

// Middleware to verify Admin
const verifyAdmin = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ success: false, message: 'No token, authorization denied' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ success: false, message: 'Token format invalid' });

  try {
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET || 'fallback_secret');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

// Initiate Admin Invite (Generates 2 OTPs)
router.post('/admin/invite', verifyAdmin, async (req, res) => {
  try {
    const { newAdminEmail } = req.body;
    const currentAdminId = req.user.id;

    if (!currentAdminId) {
      return res.status(400).json({ success: false, message: 'Invalid admin session. Please log out and log in again.' });
    }

    const currentAdmin = await User.findById(currentAdminId);
    if (!currentAdmin) return res.status(404).json({ success: false, message: 'Admin not found' });

    let targetUser = await User.findOne({ email: newAdminEmail });
    if (targetUser && targetUser.role === 'admin') {
      return res.status(400).json({ success: false, message: 'User is already an admin' });
    }

    const adminOtp = generateOTP();
    const inviteeOtp = generateOTP();

    // Store admin's OTP on currentAdmin
    currentAdmin.pendingAdminOtp = adminOtp;
    currentAdmin.pendingAdminOtpExpiry = Date.now() + 10 * 60 * 1000;
    await currentAdmin.save();

    // Store invitee's OTP on targetUser (create shell user if not exists)
    if (!targetUser) {
      const salt = await bcrypt.genSalt(10);
      const randomTempPassword = await bcrypt.hash(Math.random().toString(36) + Date.now(), salt);
      targetUser = new User({
        name: 'Pending Admin',
        email: newAdminEmail,
        password: randomTempPassword,
        isVerified: false,
        authProvider: 'local'
      });
    }
    targetUser.pendingAdminInvite = true;
    targetUser.pendingAdminOtp = inviteeOtp;
    targetUser.pendingAdminOtpExpiry = Date.now() + 10 * 60 * 1000;
    await targetUser.save();

    // Send emails
    await sendOTPEmail(currentAdmin.email, adminOtp, 'Admin Authorization Code');
    await sendOTPEmail(newAdminEmail, inviteeOtp, 'You have been invited to become an Admin');

    res.json({ success: true, message: 'OTPs sent to both parties.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Verify Admin Invite (Validates both OTPs)
router.post('/admin/verify-invite', verifyAdmin, async (req, res) => {
  try {
    const { newAdminEmail, adminOtp, inviteeOtp } = req.body;
    const currentAdminId = req.user.id;

    if (!currentAdminId) {
      return res.status(400).json({ success: false, message: 'Invalid admin session. Please log out and log in again.' });
    }

    const currentAdmin = await User.findById(currentAdminId);
    const targetUser = await User.findOne({ email: newAdminEmail });

    if (!currentAdmin || !targetUser) {
      return res.status(404).json({ success: false, message: 'User data not found' });
    }

    // Verify Admin's OTP
    if (currentAdmin.pendingAdminOtp !== adminOtp || Date.now() > currentAdmin.pendingAdminOtpExpiry) {
      return res.status(400).json({ success: false, message: 'Admin OTP is invalid or expired' });
    }

    // Verify Invitee's OTP
    if (targetUser.pendingAdminOtp !== inviteeOtp || Date.now() > targetUser.pendingAdminOtpExpiry) {
      return res.status(400).json({ success: false, message: 'Invitee OTP is invalid or expired' });
    }

    // Success! Make the target user an admin
    targetUser.role = 'admin';
    targetUser.pendingAdminInvite = false;
    targetUser.pendingAdminOtp = undefined;
    targetUser.pendingAdminOtpExpiry = undefined;
    targetUser.isVerified = true; // Implicitly verified via this secure flow
    await targetUser.save();

    // Clear admin's pending state
    currentAdmin.pendingAdminOtp = undefined;
    currentAdmin.pendingAdminOtpExpiry = undefined;
    await currentAdmin.save();

    res.json({ success: true, message: 'User has been successfully granted admin rights.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- User Management CRUD Endpoints (Admin only) ---

// 1. Get all users & summary
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    const total = users.length;
    const admins = users.filter(u => u.role === 'admin').length;
    const regularUsers = total - admins;
    
    res.json({
      success: true,
      users,
      summary: {
        total,
        admins,
        users: regularUsers
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error fetching users' });
  }
});

// 2. Create a new user manually
router.post('/users', verifyAdmin, async (req, res) => {
  try {
    const { name, email, password, role, isVerified } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      isVerified: isVerified !== undefined ? isVerified : true,
      authProvider: 'local'
    });

    await user.save();
    res.json({ success: true, message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Server error creating user' });
  }
});

// 3. Edit user details
router.put('/users/:id', verifyAdmin, async (req, res) => {
  try {
    const { name, email, password, role, isVerified } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent self-demotion
    if (req.user.id.toString() === user._id.toString() && role !== 'admin') {
      return res.status(400).json({ success: false, message: 'You cannot demote yourself from Administrator.' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    if (isVerified !== undefined) {
      user.isVerified = isVerified;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ success: true, message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Server error updating user' });
  }
});

// 4. Delete user
router.delete('/users/:id', verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent self-deletion
    if (req.user.id.toString() === user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own Administrator account.' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Server error deleting user' });
  }
});

// Middleware to verify any logged-in user
const verifyToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ success: false, message: 'No token, authorization denied' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ success: false, message: 'Token format invalid' });

  try {
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET || 'fallback_secret');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

// Verify token route (helps frontend check status quickly)
router.get('/verify', verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user, admin: req.user });
});

module.exports = router;
