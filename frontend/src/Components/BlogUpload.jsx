import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postService } from "../api/apiCalls";
import "./BlogUpload.css";

const BlogUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    backgroundImage: null,
    postImage: null,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const { title, content, backgroundImage, postImage } = formData;

    if (!title || !content || !backgroundImage || !postImage) {
      setError("Please fill out all fields and upload images.");
      setIsSubmitting(false);
      return;
    }

    const blogData = new FormData();
    blogData.append("title", title);
    blogData.append("content", content);
    blogData.append("backgroundImage", backgroundImage);
    blogData.append("postImage", postImage);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login first.");
      }

      const response = await postService.createPost(blogData, token);
      if (response.error) {
        throw new Error(response.error);
      }
      alert("Blog uploaded successfully!");
      navigate("/profile");
    } catch (error) {
      setError(error.message || "Error while creating blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Upload Your Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="postImage">Upload Blog Image</label>
            <input
              type="file"
              id="postImage"
              name="postImage"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="backgroundImage">Upload Background Image</label>
            <input
              type="file"
              id="backgroundImage"
              name="backgroundImage"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="content">Blog Content</label>
            <textarea
              id="content"
              name="content"
              rows="10"
              placeholder="Write your blog content..."
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Submit Blog"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default BlogUpload;
