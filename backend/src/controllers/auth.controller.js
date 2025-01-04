const { PrismaClient } = require('@prisma/client');
const { hashPassword, comparePasswords, generateToken } = require('../utils/auth');

const prisma = new PrismaClient();

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const profilePhoto = req.file ? req.file.path : null;

    const hashedPassword = await hashPassword(password);
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profilePhoto
      }
    });

    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};