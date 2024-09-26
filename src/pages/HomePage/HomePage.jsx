import React, { useEffect, useState } from 'react';
import { BACKGROUND_IMAGE_URLS } from 'frontend/src/constants/constrants';
import HeaderComponent from '../../components/Header/HeaderComponent';
import 'frontend/src/styles/HomePage.css';

const HomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const images = Object.values(BACKGROUND_IMAGE_URLS);
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBackgroundImage(randomImage);

    const interval = setInterval(() => {
      const newRandomImage = images[Math.floor(Math.random() * images.length)];
      setBackgroundImage(newRandomImage);
    }, 5000); // Chuyển đổi mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <HeaderComponent />
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
