import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

// register
export const register = async (req, res) => {
  const { firstname, lastname, email, password, phoneno } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstname, lastname, email, password: hashedPassword, phoneno });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.status(201).json({message: 'Registration successful'});
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.json({ token,message: 'Login successful',user: {firstname: user.firstname, email: user.email,phone:user.phoneno } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
