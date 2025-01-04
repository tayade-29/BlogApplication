import React, { useState, useEffect } from 'react';
import './Post.css';
import Beyond from '../assets/theme/beyond.jpeg';
import exp from '../assets/theme/yoga.jpg';
import del from '../assets/theme/delights.jpg';
import style from '../assets/theme/style.jpg';

const posts = [
  {
    headingWord: 'Beyond',
    title: 'Chapter One',
    date: 'December 16th, 2021',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    image: Beyond,
    backgroundColor: 'rgba(99, 136, 137, 0.8)', // Adjusted to 90% opacity
  },
  {
    headingWord: 'Delights',
    title: 'Journey Begins',
    date: 'January 5th, 2022',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    image: del,
    backgroundColor: 'rgba(239, 188, 155, 0.6)', // Adjusted to 90% opacity
  },
  {
    headingWord: 'Styles',
    title: 'Exploring Cultures',
    date: 'February 10th, 2022',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    image: style,
    backgroundColor: 'rgba(223, 204, 251, 0.8)', // Adjusted to 90% opacity
  },
  {
    headingWord: 'Experiences',
    title: 'Finding Peace',
    date: 'March 15th, 2022',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    image: exp,
    backgroundColor: 'rgba(214, 218, 200, 0.8)', // Adjusted to 90% opacity
  },
];


const Post = () => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPostIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentPost = posts[currentPostIndex];

  return (
    <div
      className="main-container"
      style={{ backgroundColor: currentPost.backgroundColor }}
    >
      <div className="explore-section">
        <h1 className="explore-heading">
          Explore <span className="changing-text">{currentPost.headingWord}</span>
        </h1>
      </div>

      <div className="post-overlay">
        {/* Post Image and Text Container */}
        <div className="post-content-wrapper">
          <div className="post-image-container">
            <img src={currentPost.image} alt="Post" className="post-image" />
          </div>
          <div className="post-text-container">
            <h2 className="post-title">{currentPost.title}</h2>
            <p className="post-date">{currentPost.date}</p>
            <p className="post-content">{currentPost.content}</p>
            <a href="#" className="post-link">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
