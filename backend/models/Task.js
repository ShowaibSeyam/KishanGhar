const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    titleBn: { type: String, default: '' },
    done: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    dueDate: { type: Date },
    category: {
      type: String,
      enum: ['crop', 'livestock', 'general', 'vet', 'market'],
      default: 'general',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
