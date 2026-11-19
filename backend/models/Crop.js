const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    nameBn: { type: String, default: '' },
    status: {
      type: String,
      enum: ['planned', 'planted', 'growing', 'harvesting', 'harvested'],
      default: 'planned',
    },
    health: {
      type: String,
      enum: ['excellent', 'good', 'warning', 'critical'],
      default: 'good',
    },
    area: { type: String, default: '' },
    planted: { type: Date },
    harvest: { type: Date },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    icon: { type: String, default: '🌾' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Crop', cropSchema);
