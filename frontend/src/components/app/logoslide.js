import React, { useEffect, useState } from 'react';

const Logoslide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="slide-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${activeSlide === index ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide})` }}
        />
      ))}
      <span>설명1</span>
    </div>
  );
};

export {Logoslide}
