// Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css';
import { FaStar, FaShareAlt, FaUser ,FaUpload} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
 
    return (
        <nav className="navbar">
           <Link to ="/" className='navbar-link'><h1 className="navbar-title">THOUGHTFULLY</h1></Link>
            <button className="navbar-toggle" onClick={toggleNavbar}>
                ☰
            </button>
            <div className={`navbar-links-container ${isOpen ? 'open' : ''}`}>
                <Link to="/explore" className='navbar-link' > Explore </Link>
                <Link to="upload" className='navbar-link'>
                <FaUpload size={20} className="icon" />
                </Link>
                <Link to="/profile" className='navbar-link'>
                    <FaUser size={20} className="icon" />
                </Link>
                
            </div>
        </nav>
    );
};

export default Navbar;

