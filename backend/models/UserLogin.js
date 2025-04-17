const mongoose = require('mongoose');

const UserLoginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  loginTime: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  }
});

const UserLogin = mongoose.model('UserLogin', UserLoginSchema);
module.exports = UserLogin; 