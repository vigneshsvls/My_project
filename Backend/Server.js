const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const userSchema = require('./models/Info_schema');
const User = require('./models/Signup_Schema');
const cors = require('cors');

const app = express();
const PORT = 9000;

app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());
dotenv.config();


// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
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
//new user
// app.post('/api/user', async (req, res) => {
//   const {username, password, displayname, location, linkedSocialMedia } = req.body;
//   try {
//     const newUser = new User({
//       username,
//       password,
//       displayname,
//       location,
//       linkedSocialMedia,
//     });
//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

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
//   const { email, platform, socialId } = req.body;  // frontend must send these 3

//   try {
//       const user = await User.findOne({ email });  // find user by email

//       if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//       }

//       // Since linkedSocialMedia is a Map, we use set()
//       user.linkedSocialMedia.set(platform, socialId);

//       await user.save();  // save the changes
//       res.json({ message: 'Social media info saved successfully!' });

//   } catch (error) {
//       console.error('Error saving social media info:', error);
//       res.status(500).json({ message: 'Server error' });
//   }
// });



app.post('/enter', async (req, res) => {
  const { email, platform, socialId, latitude, longitude } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Set social media
    user.linkedSocialMedia.set(platform, socialId);

    // Set location
    user.location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };

    await user.save();

    res.json({ message: 'Social media and location saved successfully!' });
  } catch (error) {
    console.error('Error saving social media info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/nearby', async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const nearbyUsers = await User.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 100  // 100 meters
        }
      }
    }).select('name linkedSocialMedia');

    res.json(nearbyUsers);
  } catch (error) {
    console.error('Error finding nearby users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
