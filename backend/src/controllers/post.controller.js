const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const files = req.files || {};
    
    const post = await prisma.post.create({
      data: {
        title,
        content,
        backgroundImage: files.backgroundImage?.[0].path,
        postImage: files.postImage?.[0].path,
        authorId: req.user.id
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};