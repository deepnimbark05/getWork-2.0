import mongoose from 'mongoose';

const carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imagePath: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  altText: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['home', 'ad'],
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
carouselSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Carousel', carouselSchema);