const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    perDayCharge: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    },
    reviewList: [{
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            default: ''
        },
        date: {
            type: Date,
            default: Date.now
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    }],
    imageUrl: {
        type: String,
        default: '/uploads/workers/default.png'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WorkerModel = mongoose.model("workers", WorkerSchema);
module.exports = WorkerModel; 