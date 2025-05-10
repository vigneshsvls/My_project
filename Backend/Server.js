const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/Signup_Schema');
const cors = require('cors');

const app = express();
const PORT = 9000;

app.use(cors());
//Middleware to parse JSON requests
app.use(express.json());
dotenv.config();


//MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI;

//Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});


//routes

//connecting frontend signup page to backend.
app.post('/register', async (req, res) => {
    User.create({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.json({ message: error });
    });
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }

      if (user.password !== password) {
          return res.status(400).json({ message: 'Incorrect password' });
      }

      res.json({ message: 'Login successful', user });
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
  }
});



// app.post('/enter', async (req, res) => {
//   const { email, platform, socialId, latitude, longitude } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Set social media
//     user.linkedSocialMedia.set(platform, socialId);

//     // Set location
//     user.location = {
//       type: 'Point',
//       coordinates: [longitude, latitude]
//     };

//     await user.save();

//     res.json({ message: 'Social media and location saved successfully!' });
//   } catch (error) {
//     console.error('Error saving social media info:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

app.post('/nearby', async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const nearbyUsers = await User.find({
      location: {
        // MongoDB geospatial query operator $nearSphere.
        // It finds documents within a specified distance of a geospatial point.
        //$nearSphere operator is used to find documents within a certain distance of a specified geospatial point 
        $nearSphere: {
          // Define the geometry of the point to search from.
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 100  // 100 meters
        }
      }
    }).select('name linkedSocialMedia');
    // Only select the 'name' and 'linkedSocialMedia' fields
    // from the matching user documents to be returned
    // in the result

    res.json(nearbyUsers);
  } catch (error) {
    console.error('Error finding nearby users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Profile API: Get all accounts of a user
app.get('/accounts', async (req, res) => {
  const { email } = req.query; // Get the email from query parameters

  if (!email) {
      return res.status(400).json({ message: 'Email is required' });
  }

  try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Extract linked social media accounts
      const linkedSocialMedia = Array.from(user.linkedSocialMedia.entries()).map(([platform, socialId]) => ({
          platform,
          socialId,
      }));

      res.status(200).json(linkedSocialMedia);
  } catch (error) {
      console.error('Error fetching user accounts:', error);
      res.status(500).json({ message: 'Server error' });
  }
});



// app.post('/enter', async (req, res) => {
//   const { email, socialMediaList } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Store each platform-id pair
//     socialMediaList.forEach(({ platform, socialId }) => {
//       user.linkedSocialMedia.set(platform, socialId);
//     });

//     await user.save();

//     res.json({ message: 'Social media info saved successfully!' });
//   } catch (error) {
//     console.error('Error saving social media info:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

app.post('/enter', async (req, res) => {
  const { email, socialMediaList } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure user.linkedSocialMedia exists as a Map or object
    if (!user.linkedSocialMedia) {
      user.linkedSocialMedia = {};
    }

    // Update social media entries
    socialMediaList.forEach(({ platform, socialId }) => {
      if (platform && socialId) {
        user.linkedSocialMedia.set(platform, socialId);
      }
    });

    await user.save();

    res.json({ message: 'Social media info saved successfully!' });
  } catch (error) {
    console.error('Error saving social media info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/update-location', async (req, res) => {
  const { email, latitude, longitude } = req.body;

  if (!email || latitude == null || longitude == null) {
    return res.status(400).json({ message: 'Email, latitude, and longitude are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };

    await user.save();

    res.json({ message: 'Location updated successfully' });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

