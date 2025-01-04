import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postService } from "../api/apiCalls";
import { FaBookmark } from "react-icons/fa";
import "./PostPage.css";

export const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPostById(id);
        setPost(data);
      } catch (error) {
        setError("Failed to load post");
        console.error("Failed to fetch post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-page">
      <div className="post-header-image">
        <img
          src={`https://blogapplication-apb0.onrender.com/${post.backgroundImage}`}
          alt={post.title}
          className="post-header-image"
        />
      </div>

      <div className="post-title">
        <h1>{post.title}</h1>
      </div>

      <div className="post-main-content">
        <div className="post-side-image">
          <img
            src={`https://blogapplication-apb0.onrender.com/${post.postImage}`}
            alt="Blog Content"
            className="post-side-image"
          />
        </div>

        <div className="post-content">
          <p>{post.content}</p>
        </div>
      </div>

      <div className="post-author">
        <p>
          Written by: <strong>{post.author.name}</strong>
        </p>
      </div>

      <button className="floating-button">
        <FaBookmark />
      </button>
    </div>
  );
};

export default PostPage;
