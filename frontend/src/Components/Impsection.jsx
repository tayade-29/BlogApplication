import React, { useState, useEffect } from 'react';
import './Impsection.css';

export const Impsection = () => {
  const [activeWord, setActiveWord] = useState(0);
  const words = ["Read", "Write", "Post"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prevWord) => (prevWord + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="center-container">
      <h1 className="animated-word">{words[activeWord]}</h1>
    </div>
  );
};
