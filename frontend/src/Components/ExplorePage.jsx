import React, { useState, useEffect } from "react";
import { BogPostCard } from "./BogPostCard";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { postService } from "../api/apiCalls";
import "./ExplorePage.css";

export const ExplorePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await postService.getAllPosts();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;

 

  
  return (
    <div className="explore-container">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search blogs..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>

      <h1 className="page-title">Explore More Blogs</h1>

      <div className="blog-grid">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <BogPostCard
                title={blog.title}
                postImage={blog.postImage}
                id={blog.id}
              />
            </div>
          ))
        ) : (
          <p className="no-blogs-message">No blogs found. Try another search.</p>
        )}
      </div>

      <Link to="/Upload">
        <button className="floating-button">
          <FaPlus />
        </button>
      </Link>
    </div>
  );
};

export default ExplorePage;
