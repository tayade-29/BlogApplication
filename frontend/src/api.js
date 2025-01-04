// src/api.js
import axios from "axios";

// Base URL for your API
const API_URL = "http://localhost:5000"; // Replace with your backend API URL

const api = axios.create({
  baseURL: API_URL,
});

// Set token if it exists in localStorage
const setAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.Authorization;
  }
};

// Add token to header for every request
setAuthHeader();

// API calls
export const signupUser = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/auth/me/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    const response = await api.post("/blogs/create", blogData);
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const getAllBlogs = async () => {
  try {
    const response = await api.get("/blogs");
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogsByUser = async (userId) => {
  try {
    const response = await api.get(`/blogs/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    throw error;
  }
};
