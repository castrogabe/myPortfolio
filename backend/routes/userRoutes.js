const express = require('express'); // Importing Express to create the router and handle HTTP requests
const bcrypt = require('bcryptjs'); // Importing bcryptjs for password hashing and comparison
const expressAsyncHandler = require('express-async-handler'); // Importing express-async-handler to handle exceptions in async route handlers
const User = require('../models/userModel.js'); // Importing the User model to interact with the users collection in the database
const { generateToken } = require('../utils.js'); // Importing a utility function to generate JSON Web Tokens (JWTs)

const userRouter = express.Router(); // Creating a new router instance for handling user-related routes

// POST route for user sign-in
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    // Finding the user in the database by email
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // If user exists, compare the provided password with the hashed password in the database
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // If the password matches, send back user details and a JWT token
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user), // Generating a JWT for the user
        });
        return;
      }
    }
    // If the user does not exist or the password does not match, send an error response
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

module.exports = userRouter; // Exporting the router to be used in the main application
