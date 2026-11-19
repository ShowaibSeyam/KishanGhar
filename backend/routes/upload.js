const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { uploadAvatar } = require('../middleware/upload');

router.use(protect);

// POST /api/upload/avatar
router.post('/avatar', uploadAvatar, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Avatar image is required.' });
    }

    const avatarUrl = req.file.path;

    // Update user's avatar in MongoDB
    await User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl });

    res.json({
      success: true,
      message: 'Avatar uploaded successfully.',
      avatarUrl,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
