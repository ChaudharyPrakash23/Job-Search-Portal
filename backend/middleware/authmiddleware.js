import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const bearerToken = token.split(' ')[1] || token;
  try {
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); 
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
