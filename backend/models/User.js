const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, unique: true, sparse: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String }, // null for OAuth users
    phone: { type: String, default: '' },
    location: { type: String, default: 'Bangladesh' },
    farmSize: { type: String, default: '' },
    avatar: { type: String, default: '' },
    role: { type: String, enum: ['farmer', 'admin'], default: 'farmer' },
    provider: {
      type: String,
      enum: ['email', 'google.com', 'facebook.com'],
      default: 'email',
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
