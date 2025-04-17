const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user statistics
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const usersByMonth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1
        }
      }
    ]);

    res.json({
      totalUsers,
      usersByMonth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 