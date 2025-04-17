const express = require('express');
const router = express.Router();
const HomeImage = require('../models/HomeImage');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../public/uploads/home');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Get all home images
router.get('/', async (req, res) => {
  try {
    const images = await HomeImage.find({ isActive: true }).sort('order');
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get images by type
router.get('/type/:type', async (req, res) => {
  try {
    const images = await HomeImage.find({ 
      type: req.params.type,
      isActive: true 
    }).sort('order');
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload new image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const image = new HomeImage({
      name: req.body.name,
      imageUrl: `/uploads/home/${req.file.filename}`,
      type: req.body.type,
      order: req.body.order || 0
    });

    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (error) {
    // If there's an error, delete the uploaded file
    if (req.file) {
      fs.unlinkSync(path.join(uploadDir, req.file.filename));
    }
    res.status(400).json({ message: error.message });
  }
});

// Delete image
router.delete('/:id', async (req, res) => {
  try {
    const image = await HomeImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete the file from storage
    const filePath = path.join(__dirname, '../../public', image.imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await image.remove();
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 