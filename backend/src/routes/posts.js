const express = require('express');
const { uploadPost } = require('../config/multer');
const { createPost, getAllPosts, getPost } = require('../controllers/post.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', 
  auth, 
  uploadPost.fields([
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'postImage', maxCount: 1 }
  ]), 
  createPost
);

router.get('/', getAllPosts);
router.get('/:id', getPost);

module.exports = router;