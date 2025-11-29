import React from 'react';
import Slider from '../../components/Slider/slider';
import './home.css';
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'
import image5 from '../../assets/images/image5.jpg'


const imagePaths = [
    image1, image2, image3, image4, image5
];

const Home = () => {
  return (
    <div className="home">
      <h1>Image Slider</h1>
      <Slider images={imagePaths} />
    </div>
  );
};

export default Home;
