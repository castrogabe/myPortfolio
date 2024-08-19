const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing (not used in this code)
const User = require('../models/userModel.js'); // Import User model
const Website = require('../models/websiteModel.js'); // Import Website model
const data = require('../data.js'); // Import seed data

const seedRouter = express.Router(); // Create a new Express router for seeding

seedRouter.get('/', async (req, res) => {
  try {
    // Delete all existing users and websites
    await User.deleteMany({});
    await Website.deleteMany({});

    // Create users from seed data
    const createdUsers = await User.insertMany(data.users);

    // Create websites from seed data
    const createdWebsites = await Website.insertMany(data.websites);

    // Send a success response with created users and websites
    res.send({ createdUsers, createdWebsites });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).send({ message: error.message });
  }
});

module.exports = seedRouter; // Export the seed router
