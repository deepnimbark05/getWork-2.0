const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0/getWork', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the home images to upload
const homeImages = [
  {
    name: 'hero',
    filePath: 'home1.png',
    type: 'hero',
    order: 1,
    isActive: true
  },
  {
    name: 'categories',
    filePath: 'home2.png',
    type: 'categories',
    order: 2,
    isActive: true
  },
  {
    name: 'advertisement',
    filePath: 'add1.webp',
    type: 'advertisement',
    order: 3,
    isActive: true
  },
  {
    name: 'service1',
    filePath: 'addmini1.webp',
    type: 'service',
    order: 4,
    isActive: true
  },
  {
    name: 'service2',
    filePath: 'addmini2.webp',
    type: 'service',
    order: 5,
    isActive: true
  },
  {
    name: 'service3',
    filePath: 'addmini3.webp',
    type: 'service',
    order: 6,
    isActive: true
  },
  {
    name: 'playstore',
    filePath: 'playstore.webp',
    type: 'social',
    order: 7,
    isActive: true
  },
  {
    name: 'appstore',
    filePath: 'appstore.webp',
    type: 'social',
    order: 8,
    isActive: true
  }
];

async function uploadImage(image) {
  try {
    const filePath = path.join(__dirname, '..', 'public', 'uploads', 'home', image.filePath);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return;
    }

    const formData = new FormData();
    formData.append('image', fs.createReadStream(filePath));
    formData.append('name', image.name);
    formData.append('type', image.type);
    formData.append('order', image.order);
    formData.append('isActive', image.isActive);

    const response = await axios.post('http://localhost:3001/api/home-images', formData, {
      headers: {
        ...formData.getHeaders()
      }
    });

    console.log(`Uploaded ${image.name}:`, response.data);
  } catch (error) {
    console.error(`Error uploading ${image.name}:`, error.message);
  }
}

async function uploadAllImages() {
  try {
    // Clear existing images
    await axios.delete('http://localhost:3001/api/home-images/clear');
    console.log('Cleared existing images');

    // Upload all images
    for (const image of homeImages) {
      await uploadImage(image);
    }

    console.log('All images uploaded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

uploadAllImages(); 