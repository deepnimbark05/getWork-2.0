const mongoose = require('mongoose');
const HomeImage = require('../models/HomeImage');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0/getWork");

const workerImages = [
  {
    name: 'Old Care',
    filePath: 'exercising.png',
    type: 'category',
    order: 1
  },
  {
    name: 'House Cleaning',
    filePath: 'broom.png',
    type: 'category',
    order: 2
  },
  {
    name: 'Cook',
    filePath: 'cooking.png',
    type: 'category',
    order: 3
  },
  {
    name: 'Baby Sitting',
    filePath: 'baby.png',
    type: 'category',
    order: 4
  },
  {
    name: 'Home Tution',
    filePath: 'classroom.png',
    type: 'category',
    order: 5
  },
  {
    name: 'Physiotherapist',
    filePath: 'physical.png',
    type: 'category',
    order: 6
  },
  {
    name: 'Hero Image 1',
    filePath: 'home1.png',
    type: 'hero',
    order: 1
  },
  {
    name: 'Hero Image 2',
    filePath: 'home2.png',
    type: 'hero',
    order: 2
  },
  {
    name: 'Advertisement',
    filePath: 'add1.webp',
    type: 'advertisement',
    order: 1
  },
  {
    name: 'Service 1',
    filePath: 'addmini1.webp',
    type: 'service',
    order: 1
  },
  {
    name: 'Service 2',
    filePath: 'addmini2.webp',
    type: 'service',
    order: 2
  },
  {
    name: 'Service 3',
    filePath: 'addmini3.webp',
    type: 'service',
    order: 3
  },
  {
    name: 'Play Store',
    filePath: 'playstore.webp',
    type: 'social',
    order: 1
  },
  {
    name: 'App Store',
    filePath: 'appstore.webp',
    type: 'social',
    order: 2
  }
];

async function uploadImage(imageData) {
  try {
    const imagePath = path.join(__dirname, '../../public/uploads/worker', imageData.filePath);
    
    if (!fs.existsSync(imagePath)) {
      console.error(`File not found: ${imagePath}`);
      return;
    }

    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    formData.append('name', imageData.name);
    formData.append('type', imageData.type);
    formData.append('order', imageData.order);

    const response = await axios.post('http://localhost:3001/api/home-images', formData, {
      headers: {
        ...formData.getHeaders()
      }
    });

    console.log(`Uploaded ${imageData.name}: ${response.data.imageUrl}`);
  } catch (error) {
    console.error(`Error uploading ${imageData.name}:`, error.message);
  }
}

async function uploadAllImages() {
  try {
    // Clear existing images
    await HomeImage.deleteMany({});
    console.log('Cleared existing images');

    // Upload all images
    for (const image of workerImages) {
      await uploadImage(image);
    }

    console.log('All images uploaded successfully');
  } catch (error) {
    console.error('Error in upload process:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../../public/uploads/worker');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

uploadAllImages(); 