import React, { useState } from "react";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import { apiService } from "../api/apiCalls"; // Import the login API call
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error message
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await apiService.login({ email, password }); // Pass as object
      console.log('Login successful:', response);
      onLogin();
      navigate('/home');
    } catch (error) {
      setError(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signup-option">
          <p>Don't have an account?</p>
          <Link to="/signup" className="signup-link">Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
