const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        // Get user ID from session
        const userId = req.session.userId;
        
        if (!userId) {
            return res.status(200).json({ name: 'Guest' });
        }

        // Find user by ID
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(200).json({ name: 'Guest' });
        }

        // Return user's name
        return res.status(200).json({ name: user.name });
        
    } catch (error) {
        console.error('Profile route error:', error);
        return res.status(200).json({ name: 'Guest' });
    }
});

module.exports = router; 