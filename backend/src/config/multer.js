const multer = require('multer');
const path = require('path');

const profileStorage = multer.diskStorage({
  destination: './uploads/profiles',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const postStorage = multer.diskStorage({
  destination: './uploads/posts',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

exports.uploadProfile = multer({ storage: profileStorage });
exports.uploadPost = multer({ storage: postStorage });