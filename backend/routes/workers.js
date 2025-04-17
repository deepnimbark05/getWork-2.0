const express = require('express');
const router = express.Router();
const WorkerModel = require('../models/Worker');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'public/uploads/workers';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'worker-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

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

// Update worker
router.put('/:id', async (req, res) => {
    try {
        const worker = await WorkerModel.findById(req.params.id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        // Update worker data
        const updatedWorker = await WorkerModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedWorker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete worker
router.delete('/:id', async (req, res) => {
    try {
        const worker = await WorkerModel.findById(req.params.id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        // Delete worker's image if it exists and is not the default image
        if (worker.imageUrl && worker.imageUrl !== '/uploads/workers/default.png') {
            const imagePath = path.join('public', worker.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await WorkerModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Worker deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Upload worker image
router.post('/:id/upload-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        const worker = await WorkerModel.findById(req.params.id);
        if (!worker) {
            // Delete the uploaded file if worker not found
            fs.unlinkSync(req.file.path);
            return res.status(404).json({
                success: false,
                message: 'Worker not found'
            });
        }

        // Delete old image if it exists and is not the default image
        if (worker.imageUrl && worker.imageUrl !== '/uploads/workers/default.png') {
            const oldImagePath = path.join('public', worker.imageUrl);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Update worker with new image path
        const imageUrl = `/uploads/workers/${req.file.filename}`;
        worker.imageUrl = imageUrl;
        await worker.save();

        res.json({
            success: true,
            imageUrl: imageUrl
        });
    } catch (error) {
        // Delete uploaded file if there's an error
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            success: false,
            message: 'Error uploading image',
            error: error.message
        });
    }
});

// Update worker rating
router.put('/:id/rating', async (req, res) => {
    try {
        const worker = await WorkerModel.findById(req.params.id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        const { rating, comment } = req.body;
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Invalid rating value' });
        }

        // Calculate new average rating
        const currentRating = worker.rating || 0;
        const currentReviews = worker.reviews || 0;
        const newReviews = currentReviews + 1;
        const newRating = ((currentRating * currentReviews) + rating) / newReviews;

        // Create new review object
        const newReview = {
            rating: rating,
            comment: comment || '',
            date: new Date()
        };

        // Update worker with new rating and add review to reviewList
        const updatedWorker = await WorkerModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    rating: newRating,
                    reviews: newReviews
                },
                $push: {
                    reviewList: newReview
                }
            },
            { new: true }
        );

        res.json(updatedWorker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get worker reviews
router.get('/:id/reviews', async (req, res) => {
    try {
        const worker = await WorkerModel.findById(req.params.id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.json(worker.reviewList || []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Toggle review visibility
router.put('/:workerId/reviews/:reviewId/toggle', async (req, res) => {
    try {
        const worker = await WorkerModel.findById(req.params.workerId);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        const reviewIndex = worker.reviewList.findIndex(
            review => review._id.toString() === req.params.reviewId
        );

        if (reviewIndex === -1) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Toggle the isDisabled status
        worker.reviewList[reviewIndex].isDisabled = !worker.reviewList[reviewIndex].isDisabled;

        // Recalculate average rating excluding disabled reviews
        const enabledReviews = worker.reviewList.filter(review => !review.isDisabled);
        const totalRating = enabledReviews.reduce((sum, review) => sum + review.rating, 0);
        worker.rating = enabledReviews.length > 0 ? totalRating / enabledReviews.length : 0;
        worker.reviews = enabledReviews.length;

        await worker.save();
        res.json(worker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 