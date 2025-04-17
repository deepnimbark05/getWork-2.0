const mongoose = require('mongoose');
const HomeImage = require('../models/HomeImage');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0/getWork");

const workerImages = [
  {
    name: 'Old Care',
    imageUrl: '/uploads/worker/exercising.png',
    type: 'category',
    order: 1
  },
  {
    name: 'House Cleaning',
    imageUrl: '/uploads/worker/broom.png',
    type: 'category',
    order: 2
  },
  {
    name: 'Cook',
    imageUrl: '/uploads/worker/cooking.png',
    type: 'category',
    order: 3
  },
  {
    name: 'Baby Sitting',
    imageUrl: '/uploads/worker/baby.png',
    type: 'category',
    order: 4
  },
  {
    name: 'Home Tution',
    imageUrl: '/uploads/worker/classroom.png',
    type: 'category',
    order: 5
  },
  {
    name: 'Physiotherapist',
    imageUrl: '/uploads/worker/physical.png',
    type: 'category',
    order: 6
  },
  {
    name: 'Hero Image 1',
    imageUrl: '/uploads/worker/home1.png',
    type: 'hero',
    order: 1
  },
  {
    name: 'Hero Image 2',
    imageUrl: '/uploads/worker/home2.png',
    type: 'hero',
    order: 2
  },
  {
    name: 'Advertisement',
    imageUrl: '/uploads/worker/add1.webp',
    type: 'advertisement',
    order: 1
  },
  {
    name: 'Service 1',
    imageUrl: '/uploads/worker/addmini1.webp',
    type: 'service',
    order: 1
  },
  {
    name: 'Service 2',
    imageUrl: '/uploads/worker/addmini2.webp',
    type: 'service',
    order: 2
  },
  {
    name: 'Service 3',
    imageUrl: '/uploads/worker/addmini3.webp',
    type: 'service',
    order: 3
  },
  {
    name: 'Play Store',
    imageUrl: '/uploads/worker/playstore.webp',
    type: 'social',
    order: 1
  },
  {
    name: 'App Store',
    imageUrl: '/uploads/worker/appstore.webp',
    type: 'social',
    order: 2
  }
];

async function migrateImages() {
  try {
    // Clear existing images
    await HomeImage.deleteMany({});
    console.log('Cleared existing images');

    // Insert new images
    for (const image of workerImages) {
      const newImage = new HomeImage(image);
      await newImage.save();
      console.log(`Added image: ${image.name}`);
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    mongoose.disconnect();
  }
}

migrateImages(); 