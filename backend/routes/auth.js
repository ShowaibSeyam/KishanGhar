const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const ADMIN_EMAILS = ['seyamseam@gmail.com'];

const isUserAdmin = (email) => ADMIN_EMAILS.includes((email || '').toLowerCase().trim());

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// ─── POST /api/auth/register ──────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, location, farmSize } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password required.' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    const hashed = await bcrypt.hash(password, 12);
    const role = isUserAdmin(email) ? 'admin' : 'farmer';
    const user = await User.create({
      name, email, password: hashed,
      phone: phone || '',
      location: location || 'Bangladesh',
      farmSize: farmSize || '',
      provider: 'email',
      role,
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        farmSize: user.farmSize,
        role: user.role,
        provider: user.provider,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        farmSize: user.farmSize,
        role: user.role,
        provider: user.provider,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST /api/auth/social-sync ───────────────────────────────
// Called after Firebase Google/Facebook login to sync user to MongoDB
router.post('/social-sync', async (req, res) => {
  try {
    const { firebaseUid, name, email, provider, avatar } = req.body;

    if (!firebaseUid || !email) {
      return res.status(400).json({ success: false, message: 'firebaseUid and email required.' });
    }

    // Find by firebaseUid or email
    let user = await User.findOne({ $or: [{ firebaseUid }, { email }] });

    const role = isUserAdmin(email) ? 'admin' : (user?.role || 'farmer');

    if (user) {
      // Update existing
      user.firebaseUid = firebaseUid;
      user.provider = provider || user.provider;
      user.role = role;
      if (avatar) user.avatar = avatar;
      await user.save();
    } else {
      // Create new
      user = await User.create({
        firebaseUid,
        name: name || 'Farmer',
        email,
        provider: provider || 'google.com',
        avatar: avatar || '',
        role,
        isVerified: true,
      });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        farmSize: user.farmSize,
        avatar: user.avatar,
        role: user.role,
        provider: user.provider,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/auth/me ─────────────────────────────────────────
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, user: req.user });
});

// ─── PUT /api/auth/profile ────────────────────────────────────
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, location, farmSize } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (farmSize !== undefined) user.farmSize = farmSize;

    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
