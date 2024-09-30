import React, { useEffect, useState } from 'react';
import { BACKGROUND_IMAGE_URLS } from 'frontend/src/constants/constrants';
import FindTicketComponent from '../../components/FindTicketComponent/FindTicketComponent';
import 'frontend/src/styles/HomePage.css';
import HeaderComponent from '../../components/Header/HeaderComponent';

// Component riêng để xử lý việc thay đổi hình nền
const BackgroundChanger = ({ setBackgroundImage }) => {
  useEffect(() => {
    const images = Object.values(BACKGROUND_IMAGE_URLS);
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBackgroundImage(randomImage);

    const interval = setInterval(() => {
      const newRandomImage = images[Math.floor(Math.random() * images.length)];
      setBackgroundImage(newRandomImage);
    }, 5000); // Chuyển đổi mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [setBackgroundImage]);

  return null; // Không cần render gì cả
};

const HomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

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
      <FindTicketComponent />
      <BackgroundChanger setBackgroundImage={setBackgroundImage} />
    </div>
  );
};

export default HomePage;
