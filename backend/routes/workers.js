const express = require('express');
const router = express.Router();
const WorkerModel = require('../models/Worker');

// Create a new worker
router.post('/', async (req, res) => {
    try {
        const worker = await WorkerModel.create(req.body);
        res.status(201).json(worker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get workers by category
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const workers = await WorkerModel.find(query);
        res.json(workers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get worker by ID
router.get('/:id', async (req, res) => {
    try {
        const worker = await WorkerModel.findById(req.params.id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.json(worker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 