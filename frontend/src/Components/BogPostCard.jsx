import React from "react";
import { Link } from "react-router-dom";
import "./BlogPostCard.css";

export const BogPostCard = ({ title, postImage, id }) => {
  return (
    <div className="blog-post-card">
      <div className="blog-image-container">
        <img
          src={`https://blogapplication-apb0.onrender.com/${postImage}`} // Updated URL
          alt={title}
          className="blog-image"
        />
        <div className="blog-overlay">
          <h2 className="blog-title">{title}</h2>
          <Link to={`/post/${id}`} className="read-button">
            Read <span className="arrow-icon">➔</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
