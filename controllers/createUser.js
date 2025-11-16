import User from '../models/user.js';
import bcrypt from 'bcryptjs';

function generateUserId(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, age } = req.body;
    const existingUser = await User.findOne({
      $or: [ { username }, { email } ]
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }
    let userid;
    let attempts = 0;
    do {
      userid = generateUserId(12);
      var idCheck = await User.findOne({ userid });
      attempts++;
    } while(idCheck && attempts < 5);
    if (idCheck) {
      return res.status(500).json({ message: 'Failed to generate unique user ID.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword, userid, age });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
