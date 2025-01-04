const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

exports.comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

exports.generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};