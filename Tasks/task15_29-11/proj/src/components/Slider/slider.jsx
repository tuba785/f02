import React, { useState } from 'react';
import './slider.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
      <img
        src={images[currentIndex]}
        alt="Slide"
        className="slider-image"
      />

      <div className="slider-buttons">
        <button className="nav-btn" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="nav-btn" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Slider;
