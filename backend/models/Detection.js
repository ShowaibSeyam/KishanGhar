const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['crop', 'animal'], required: true },

    // Uploaded image (Cloudinary)
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String },     // Cloudinary public_id (for deletion)

    // Detection result (from AI or manual)
    result: {
      detected: { type: String, default: '' },        // e.g. "Rice Blast Disease"
      detectedBn: { type: String, default: '' },      // Bangla name
      confidence: { type: Number, default: 0 },        // 0–100%
      severity: { type: String, enum: ['low', 'medium', 'high', 'unknown'], default: 'unknown' },
      description: { type: String, default: '' },
      descriptionBn: { type: String, default: '' },
      recommendations: [{ type: String }],
      recommendationsBn: [{ type: String }],
    },

    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Detection', detectionSchema);
