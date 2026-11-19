const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const { protect } = require('../middleware/auth');

// All routes require login
router.use(protect);

// GET /api/crops — get all crops for logged-in user
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: crops });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/crops — add a new crop
router.post('/', async (req, res) => {
  try {
    const crop = await Crop.create({ ...req.body, userId: req.user._id });
    res.status(201).json({ success: true, data: crop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/crops/:id — update a crop
router.put('/:id', async (req, res) => {
  try {
    const crop = await Crop.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found.' });
    res.json({ success: true, data: crop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/crops/:id — delete a crop
router.delete('/:id', async (req, res) => {
  try {
    const crop = await Crop.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found.' });
    res.json({ success: true, message: 'Crop deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
