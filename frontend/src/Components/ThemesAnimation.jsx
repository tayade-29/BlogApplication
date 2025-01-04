import React from 'react';
import './ThemesAnimation.css';
import art from '../assets/theme/art.jpg';
import cook from '../assets/theme/cook.jpg';
import travelImage from '../assets/theme/life.jpg';
import travel from '../assets/theme/travel.jpg';
import fashion from '../assets/theme/fshion.jpeg';
import science from '../assets/theme/science.jpg';

const themeImages = [art, cook, travelImage, travel, fashion, science];

const ThemesAnimation = () => {
    return (
        <div className="home-section">
            <div className="themes-animation-container">
                {themeImages.map((image, index) => (
                    <div
                        key={index}
                        className="theme-image-wrapper"
                        style={{ bottom: index % 2 === 0 ? '0px' : '20px' }} // Alternate offset for layering effect
                    >
                        <img src={image} alt={`Theme ${index}`} className="theme-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThemesAnimation;
