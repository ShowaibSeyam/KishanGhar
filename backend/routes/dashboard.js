const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const Livestock = require('../models/Livestock');
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');

router.use(protect);

// GET /api/dashboard/stats — summary stats for the logged-in user
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user._id;

    const [crops, livestock, tasks] = await Promise.all([
      Crop.find({ userId }),
      Livestock.find({ userId }),
      Task.find({ userId }),
    ]);

    const stats = {
      totalCrops: crops.length,
      activeCrops: crops.filter((c) => ['growing', 'planted', 'harvesting'].includes(c.status)).length,
      totalAnimals: livestock.reduce((sum, a) => sum + (a.count || 1), 0),
      sickAnimals: livestock.filter((a) => a.health === 'sick').length,
      totalTasks: tasks.length,
      doneTasks: tasks.filter((t) => t.done).length,
      pendingTasks: tasks.filter((t) => !t.done).length,
      highPriorityTasks: tasks.filter((t) => !t.done && t.priority === 'high').length,
    };

    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
