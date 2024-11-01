const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const {sign} = require('jsonwebtoken');




// User Signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const passwordHashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: passwordHashed,
    })

    res.status(201).json({newUser});

    } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'No User with this email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

    const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token",  token, {
        maxAge: 60 * 60 *24 * 30 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production (HTTPS)
        sameSite: 'Strict',  // Prevents CSRF attacks

      })
    res.json({ message: 'Login successful' });

  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// controllers/userController.js
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      console.log('User not found'); // Debugging line
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error); // Debugging line
    next(error); // Forward the error to error handling middleware
  }
};

exports.logout = async (req, res) =>{
  res.clearCookie("token");
  res.json("LOGGED OUT");
}