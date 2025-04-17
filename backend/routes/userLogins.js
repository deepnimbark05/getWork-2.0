const express = require('express');
const router = express.Router();
const UserLogin = require('../models/UserLogin');

// Track user login
router.post('/track', async (req, res) => {
  try {
    const { userId, category } = req.body;
    const login = await UserLogin.create({ userId, category });
    res.status(201).json(login);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get login statistics by category
router.get('/stats', async (req, res) => {
  try {
    const stats = await UserLogin.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Convert to the format expected by the frontend
    const formattedStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    res.json(formattedStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 