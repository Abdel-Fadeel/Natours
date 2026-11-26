const fs = require('fs');
const path = require('path');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');

const dataDir = path.join(__dirname, '..', 'dev-data', 'data');
const readJSON = (file) =>
  JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));

// Loads the demo tours, users and reviews when the database is empty.
// Enabled by setting SEED_DEMO_DATA=true (used for the live demo).
module.exports = async () => {
  if (process.env.SEED_DEMO_DATA !== 'true') return;

  const toursCount = await Tour.countDocuments();
  if (toursCount > 0) return;

  console.log('Empty database detected, seeding demo data...');
  await Tour.create(readJSON('tours.json'));
  // Passwords in users.json are already hashed, so skip the save hooks
  await User.insertMany(readJSON('users.json'));
  await Review.create(readJSON('reviews.json'));
  console.log('Demo data seeded successfully!');
};
