const express = require('express');
const multer = require('multer');
const path = require ('path');
const { fileURLToPath } = require( 'url');
const fs = require('fs');

const router = express.Router();



// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'public/uploads/carousel';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'carousel-' + uniqueSuffix + path.extname(file.originalname));
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

// Get all carousel images with optional filtering
router.get('/', async (req, res) => {
  try {
    const { type, isActive, limit = 10, page = 1 } = req.query;
    
    // Build query based on filters
    const query = {};
    if (type) query.type = type;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const images = await Carousel.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Carousel.countDocuments(query);

    res.json({
      success: true,
      data: images,
      pagination: {
        current: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching carousel images',
      error: error.message
    });
  }
});

// Get a single carousel image by ID
router.get('/:id', async (req, res) => {
  try {
    const image = await Carousel.findById(req.params.id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    res.json({
      success: true,
      data: image
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching carousel image',
      error: error.message
    });
  }
});

// Create new carousel image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const imageUrl = `/uploads/carousel/${req.file.filename}`;
    const carouselImage = new Carousel({
      title: req.body.title,
      description: req.body.description,
      imagePath: req.file.path,
      imageUrl: imageUrl,
      altText: req.body.altText || req.body.title,
      type: req.body.type,
      order: req.body.order,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    });

    const savedImage = await carouselImage.save();
    res.status(201).json({
      success: true,
      data: savedImage
    });
  } catch (error) {
    // Delete uploaded file if database save fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      success: false,
      message: 'Error creating carousel image',
      error: error.message
    });
  }
});

module.exports =  router;