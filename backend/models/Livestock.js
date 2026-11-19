const mongoose = require('mongoose');

const livestockSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    nameBn: { type: String, default: '' },
    type: {
      type: String,
      enum: ['cow', 'goat', 'chicken', 'duck', 'sheep', 'other'],
      required: true,
    },
    breed: { type: String, default: '' },
    age: { type: String, default: '' },
    weight: { type: String, default: '' },
    health: {
      type: String,
      enum: ['healthy', 'sick', 'recovering', 'critical'],
      default: 'healthy',
    },
    vaccination: {
      type: String,
      enum: ['vaccinated', 'pending', 'overdue'],
      default: 'pending',
    },
    lastCheckup: { type: Date },
    milk: { type: String, default: '' },      // for cows
    eggs: { type: String, default: '' },      // for chickens/ducks
    count: { type: Number, default: 1 },      // for batch animals
    emoji: { type: String, default: '🐄' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Livestock', livestockSchema);
