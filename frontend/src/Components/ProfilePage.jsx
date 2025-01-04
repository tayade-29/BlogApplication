import React, { useState, useEffect } from 'react';
import {apiService} from '../api/apiCalls';
 // Assuming this is the function to fetch user data
 import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await apiService.getProfile();
        console.log(userData); // Inspect profilePhoto field here
        setUser(userData);
      } catch (error) {
        setError(error.message || 'Failed to fetch profile');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProfile();
  }, []);
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div className="profile-page">
      <div className="profile-top">
        <div className="profile-left">
          <div className="profile-image-box">
            {user?.profilePhoto ? (
              <img
                src={`https://blogapplication-apb0.onrender.com/${user.profilePhoto}`} // Ensure backend serves image
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <p>No profile photo available</p>
            )}
          </div>
        </div>
        <div className="profile-right">
          {/* Conditionally render user data */}
          {user ? (
            <>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <table className="profile-table">
                <tbody>
                  <tr>
                    <td>Joined:</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
      </div>

      <div className="profile-dashboard">
        <h3>Your Blogs</h3>
        <div className="dashboard-blogs">
          {/* Check if user.blogs exists and is an array */}
          {user?.blogs && user.blogs.length > 0 ? (
            user.blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <h4>{blog.title}</h4>
                <p>{blog.description}</p>
              </div>
            ))
          ) : (
            <p>No blogs uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
