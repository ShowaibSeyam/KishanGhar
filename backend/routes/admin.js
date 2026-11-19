const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Crop = require('../models/Crop');
const Livestock = require('../models/Livestock');
const Task = require('../models/Task');
const Detection = require('../models/Detection');
const { protect } = require('../middleware/auth');

// Admin verification middleware
const requireAdmin = (req, res, next) => {
  const adminEmails = ['seyamseam@gmail.com'];
  const userEmail = (req.user?.email || '').toLowerCase().trim();

  if (req.user?.role === 'admin' || adminEmails.includes(userEmail)) {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied. Admin rights required.' });
  }
};

router.use(protect);
router.use(requireAdmin);

// ─── GET /api/admin/stats ──────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const [
      totalUsers,
      totalCrops,
      totalAnimals,
      totalTasks,
      totalDetections,
      cropDetections,
      animalDetections,
      recentUsers,
    ] = await Promise.all([
      User.countDocuments(),
      Crop.countDocuments(),
      Livestock.countDocuments(),
      Task.countDocuments(),
      Detection.countDocuments(),
      Detection.countDocuments({ type: 'crop' }),
      Detection.countDocuments({ type: 'animal' }),
      User.find().sort({ createdAt: -1 }).limit(5).select('-password'),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalCrops,
        totalAnimals,
        totalTasks,
        totalDetections,
        cropDetections,
        animalDetections,
        recentUsers,
        database: 'MongoDB Atlas Connected',
        serverTime: new Date().toISOString(),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/admin/users ──────────────────────────────────────
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password');
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── PUT /api/admin/users/:id/role ─────────────────────────────
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['farmer', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role.' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── DELETE /api/admin/users/:id ───────────────────────────────
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    if (user.email === 'seyamseam@gmail.com') {
      return res.status(400).json({ success: false, message: 'Cannot delete primary admin account.' });
    }

    await user.deleteOne();
    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/admin/detections ─────────────────────────────────
router.get('/detections', async (req, res) => {
  try {
    const detections = await Detection.find()
      .populate('userId', 'name email location')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ success: true, data: detections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── DELETE /api/admin/detections/:id ──────────────────────────
router.delete('/detections/:id', async (req, res) => {
  try {
    const detection = await Detection.findByIdAndDelete(req.params.id);
    if (!detection) return res.status(404).json({ success: false, message: 'Detection not found.' });
    res.json({ success: true, message: 'Detection deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/admin/crops ──────────────────────────────────────
router.get('/crops', async (req, res) => {
  try {
    const crops = await Crop.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: crops });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── DELETE /api/admin/crops/:id ───────────────────────────────
router.delete('/crops/:id', async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(req.params.id);
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found.' });
    res.json({ success: true, message: 'Crop deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/admin/livestock ──────────────────────────────────
router.get('/livestock', async (req, res) => {
  try {
    const animals = await Livestock.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: animals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── PUT /api/admin/livestock/:id ──────────────────────────────
router.put('/livestock/:id', async (req, res) => {
  try {
    const animal = await Livestock.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!animal) return res.status(404).json({ success: false, message: 'Animal not found.' });
    res.json({ success: true, data: animal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── DELETE /api/admin/livestock/:id ───────────────────────────
router.delete('/livestock/:id', async (req, res) => {
  try {
    const animal = await Livestock.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ success: false, message: 'Animal not found.' });
    res.json({ success: true, message: 'Animal deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
