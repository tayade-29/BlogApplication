import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Left Side Content */}
      <div className="left-content">
        <div className="quote-container">
          <h2 className="quote animate-quote">
            "Write to inspire, express to connect, and share your story with the world."
          </h2>
          <button
            className="get-started-button animate-button"
            onClick={() => (window.location.href = '/login')}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="right-content">
        <img
          src="/images/1.gif" // Replace with your image path
          alt="Inspiration"
          className="inspiration-image"
        />
      </div>
    </div>
  );
};

export default LandingPage;
