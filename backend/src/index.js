require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies if needed
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the API Server</h1>
    <p>The server is running smoothly!</p>
    <p>Use the <code>/api</code> routes to interact with the backend.</p>
  `);
});

// // Serve React build folder (for full-stack deployment)
// if (process.env.NODE_ENV === 'production') {
//   // Serve React build folder
//   app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Correct path to dist folder

//   // Catch-all route to send index.html for all other requests
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
//   });
// }

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the welcome message.`);
});
