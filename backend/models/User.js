const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() {
      // Password is required only if authProvider is local
      return this.authProvider === 'local';
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  googleId: {
    type: String
  },
  otpCode: {
    type: String
  },
  otpExpiry: {
    type: Date
  },
  // Used during Dual-OTP Admin assignment
  pendingAdminInvite: {
    type: Boolean,
    default: false
  },
  pendingAdminOtp: {
    type: String
  },
  pendingAdminOtpExpiry: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
