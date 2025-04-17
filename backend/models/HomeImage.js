const mongoose = require('mongoose');

const homeImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['hero', 'category', 'advertisement', 'service', 'social']
  },
  order: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HomeImage', homeImageSchema); 