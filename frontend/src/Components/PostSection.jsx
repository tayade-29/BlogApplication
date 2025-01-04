// frontend/src/components/PostSection.js
import React from 'react';
import Posts from './Posts';



const PostSection = () => {
  const posts = [
    {
      title: 'Post Title 1',
      author: 'Author 1',
      image: 'https://via.placeholder.com/300', // Replace with actual image URLs
      description: 'This is a short description of the post.',
    },
    // Add more posts as needed
  ];

  const handleMoreClick = (title) => {
    alert(`Opening post: ${title}`);
    // Here you can implement the navigation to the post page
  };

  return (
    <div className="post-section">
      {posts.map((post, index) => (
        <Posts
        key={index}
          title={post.title}
          author={post.author}
          image={post.image}
          description={post.description}
          onMoreClick={() => handleMoreClick(post.title)}
        />

      ))}
    </div>
  );
};

export default PostSection;
