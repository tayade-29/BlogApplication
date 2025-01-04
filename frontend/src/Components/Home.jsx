// Home.jsx
import React from 'react';
import './Home.css';
import ThemesAnimation from './ThemesAnimation';

const Home = () => {
    return (
        <>
            <section className="home">
                <p className="home-text">Fuel your imagination</p>
                <p className="home-text">Connect with like-minded people</p>
                <ThemesAnimation />
            </section>
        </>
    );
};

export default Home;
