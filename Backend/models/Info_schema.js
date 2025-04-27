const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    displayname:{
        type:String,
        required:true,
    },
    location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: {
          type: [Number], //[longitude, latitude]
          index: '2dsphere' //For geospatial queries
        }
    },

    linkedSocialMedia: {
        type: Map, // Using Map to dynamically store IDs
        of: String, // The value will be the social media ID (String)
        default: {}
      },
  
});

module.exports = mongoose.model('User', userSchema);
