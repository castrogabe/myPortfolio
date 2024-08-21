const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library for creating and verifying JSON Web Tokens (JWTs)

// Function to generate a JWT token for a user
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id, // Including the user's ID in the token payload
      name: user.name, // Including the user's name in the token payload
      email: user.email, // Including the user's email in the token payload
      isAdmin: user.isAdmin, // Including the user's admin status in the token payload
    },
    process.env.JWT_SECRET, // Using a secret key from environment variables to sign the token
    {
      expiresIn: '30d', // Setting the token to expire in 30 days
    }
  );
};

module.exports = { generateToken }; // Exporting the generateToken function for use in other parts of the application
