const express = require('express');
const router = express.Router();
const Livestock = require('../models/Livestock');
const { protect } = require('../middleware/auth');

router.use(protect);

// GET /api/livestock
router.get('/', async (req, res) => {
  try {
    const animals = await Livestock.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: animals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/livestock
router.post('/', async (req, res) => {
  try {
    const animal = await Livestock.create({ ...req.body, userId: req.user._id });
    res.status(201).json({ success: true, data: animal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/livestock/:id
router.put('/:id', async (req, res) => {
  try {
    const animal = await Livestock.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!animal) return res.status(404).json({ success: false, message: 'Animal not found.' });
    res.json({ success: true, data: animal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/livestock/:id
router.delete('/:id', async (req, res) => {
  try {
    const animal = await Livestock.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!animal) return res.status(404).json({ success: false, message: 'Animal not found.' });
    res.json({ success: true, message: 'Animal deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
