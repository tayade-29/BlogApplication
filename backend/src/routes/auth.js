const express = require('express');
const { uploadProfile } = require('../config/multer');
const { signup, login } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', uploadProfile.single('profilePhoto'), signup);
router.post('/login', login);

module.exports = router;