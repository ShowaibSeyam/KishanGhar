const express = require('express');
const router = express.Router();
const Detection = require('../models/Detection');
const { protect } = require('../middleware/auth');
const { uploadCropImage, uploadAnimalImage, cloudinary } = require('../middleware/upload');
const { diagnoseImage } = require('../services/aiDiagnosis');

router.use(protect);

// ─── POST /api/detections/crop ─────────────────────────────────
// Upload a crop image → Cloudinary → AI Diagnosis → Save to MongoDB
router.post('/crop', uploadCropImage, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required.' });
    }

    const imageUrl = req.file.path;
    const imagePublicId = req.file.filename;

    // Run AI Diagnosis
    const aiResult = await diagnoseImage('crop', imageUrl);

    // Save detection record with AI result
    const detection = await Detection.create({
      userId: req.user._id,
      type: 'crop',
      imageUrl,
      imagePublicId,
      result: aiResult,
      status: 'completed',
      notes: req.body.notes || '',
    });

    res.status(201).json({
      success: true,
      message: 'Image analyzed successfully.',
      data: {
        id: detection._id,
        imageUrl,
        result: aiResult,
        status: 'completed',
        createdAt: detection.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST /api/detections/animal ───────────────────────────────
router.post('/animal', uploadAnimalImage, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required.' });
    }

    const imageUrl = req.file.path;
    const imagePublicId = req.file.filename;

    // Run AI Diagnosis
    const aiResult = await diagnoseImage('animal', imageUrl);

    const detection = await Detection.create({
      userId: req.user._id,
      type: 'animal',
      imageUrl,
      imagePublicId,
      result: aiResult,
      status: 'completed',
      notes: req.body.notes || '',
    });

    res.status(201).json({
      success: true,
      message: 'Image analyzed successfully.',
      data: {
        id: detection._id,
        imageUrl,
        result: aiResult,
        status: 'completed',
        createdAt: detection.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/detections — history ────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = { userId: req.user._id };
    if (type) filter.type = type;

    const detections = await Detection.find(filter).sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: detections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/detections/:id ───────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const detection = await Detection.findOne({ _id: req.params.id, userId: req.user._id });
    if (!detection) return res.status(404).json({ success: false, message: 'Detection not found.' });
    res.json({ success: true, data: detection });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── PUT /api/detections/:id/result — save AI result ──────────
router.put('/:id/result', async (req, res) => {
  try {
    const detection = await Detection.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { result: req.body.result, status: 'completed' },
      { new: true }
    );
    if (!detection) return res.status(404).json({ success: false, message: 'Detection not found.' });
    res.json({ success: true, data: detection });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── DELETE /api/detections/:id ───────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const detection = await Detection.findOne({ _id: req.params.id, userId: req.user._id });
    if (!detection) return res.status(404).json({ success: false, message: 'Detection not found.' });

    // Delete from Cloudinary too
    if (detection.imagePublicId) {
      await cloudinary.uploader.destroy(detection.imagePublicId);
    }
    await detection.deleteOne();
    res.json({ success: true, message: 'Detection deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
