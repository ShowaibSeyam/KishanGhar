const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    const User = require('../models/User');
    const existing = await User.findOne({ email: 'seyamseam@gmail.com' });
    if (existing) {
      existing.role = 'admin';
      await existing.save();
      console.log('User found and updated to admin:', existing);
    } else {
      console.log('seyamseam@gmail.com does not exist in DB yet. It will automatically get admin role when syncing or logging in.');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}
run();
