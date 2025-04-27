// models/Signup_Schema.js
const mongoose = require('mongoose');

const SignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  linkedSocialMedia: {
    type: Map,
    of: String,
    default: {}
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  }
}, { timestamps: true });

// Very important for geo search
SignupSchema.index({ location: "2dsphere" });

const User = mongoose.model('User', SignupSchema, 'user_info');

module.exports = User;
