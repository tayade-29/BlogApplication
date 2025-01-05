const API_URL = "https://blogapplication-uuha.onrender.com"; // Backend URL

export const apiService = {
  // Auth endpoints
  async signup(formData) {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        body: formData, // Use FormData for file uploads
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token for auth
      return data;
    } catch (error) {
      console.error('Signup Error:', error.message);
      throw error;
    }
  },

  async login(credentials) {
    console.log('Login API called with:', credentials); // Debug logging
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      console.log('API Response:', response); // Debug response
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error;
    }
  },
  

  async getProfile() {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found');

      const response = await fetch(`${API_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Get Profile Error:', error.message);
      throw error;
    }
  },
};

export const postService = {
  async createPost(formData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found');

      const response = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // FormData for file uploads
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create post');
      }

      return await response.json();
    } catch (error) {
      console.error('Create Post Error:', error.message);
      throw error;
    }
  },

  async getAllPosts() {
    try {
      const response = await fetch(`${API_URL}/api/posts`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch posts');
      }
      return await response.json();
    } catch (error) {
      console.error('Get All Posts Error:', error.message);
      throw error;
    }
  },

  async getPostById(id) {
    try {
      const response = await fetch(`${API_URL}/api/posts/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch post');
      }
      return await response.json();
    } catch (error) {
      console.error('Get Post By ID Error:', error.message);
      throw error;
    }
  },
};
