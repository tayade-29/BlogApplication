import React, { useState } from 'react';
import './LoginPage.css'; // Reuse the same CSS for styling
import { Link, useNavigate } from 'react-router-dom'; // Use navigate for redirection
import { apiService } from '../api/apiCalls';// Ensure the signup API call is used

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!profilePhoto) {
      setError('Please upload a profile photo');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('profilePhoto', profilePhoto);

    try {
      await apiService.signup(formDataToSend);
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Signup failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Profile Picture Input */}
          <div className="input-group">
            <label htmlFor="profilePhoto">Profile Picture</label>
            <input
              type="file"
              id="profilePhoto"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-btn">
            Signup
          </button>

          {/* Login Redirect Option */}
          <div className="signup-option">
            <p>Already have an account?</p>
            <Link to="/login" className="signup-link">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
