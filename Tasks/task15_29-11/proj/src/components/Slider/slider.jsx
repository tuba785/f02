import React, { useState } from 'react';
import './slider.css';

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  console.log(images);

  return (
    <div className="slider-container">
      <div className="slider">
        <button className="prev" onClick={prevSlide}>
          prev
        </button>
        <img src={images[currentIndex]} alt="Slide" className="slider-image" />
        <button className="next" onClick={nextSlide}>
          next
        </button>
      </div>
    </div>
  );
};

export default Slider;