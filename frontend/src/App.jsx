import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import PostSection from './Components/PostSection';
import  ProfilePage  from './Components/ProfilePage';
import { Impsection } from './Components/Impsection';
import ExplorePage from './Components/ExplorePage';
import { BogPostCard } from './Components/BogPostCard';
import PostPage from './Components/PostPage';
import BlogUpload from './Components/BlogUpload';
import LandingPage from './Components/LandingPage';
import LoginPage from './Components/LoginPage';
import { ErrorPage } from './Components/ErrorPage';
import SignupPage from './Components/SignUpPage'

// Component for layout and conditional Navbar visibility
const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      {/* Show Navbar only when logged in */}
      {isLoggedIn && <Navbar onLogout={() => setIsLoggedIn(false)} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage onLogin={() => setIsLoggedIn(true)} />} />
        
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginPage onLogin={() => setIsLoggedIn(true)} /> // Pass onLogin function here
            )
          }
        />

        {/* Protected Routes */}
      
        {isLoggedIn ? (
          <>
            <Route
              path="/home"
              element={
                <>
                  <Home />
                  <PostSection />
                  <Impsection />
                </>
              }
             />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/upload" element={<BlogUpload />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

        {/* Signup Route */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
};

export default App;
