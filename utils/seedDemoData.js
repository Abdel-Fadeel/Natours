const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');

const dataDir = path.join(__dirname, '..', 'dev-data', 'data');
const readJSON = (file) =>
  JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));

// Loads the demo tours, users and reviews into any empty collection.
// Enabled by setting SEED_DEMO_DATA=true (used for the live demo).
module.exports = async () => {
  if (process.env.SEED_DEMO_DATA !== 'true') return;

  try {
    if ((await Tour.countDocuments()) === 0) {
      await Tour.create(readJSON('tours.json'));
      console.log('Seeded demo tours.');
    }

    // Count with the raw collection: the User model hides inactive users
    if ((await User.collection.countDocuments()) === 0) {
      // Passwords in users.json are already hashed, so insert them directly
      // (bypasses the hashing hooks and the passwordConfirm validator)
      const users = readJSON('users.json').map((user) => ({
        ...user,
        _id: mongoose.Types.ObjectId(user._id),
      }));
      await User.collection.insertMany(users);
      console.log('Seeded demo users.');
    }

    if ((await Review.countDocuments()) === 0) {
      await Review.create(readJSON('reviews.json'));
      console.log('Seeded demo reviews.');
    }
  } catch (err) {
    console.log('Seeding demo data failed:', err.message);
  }
};
