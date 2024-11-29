import React from 'react';
import FooterComponent from '../Footer/FooterComponent';
import HeaderComponent from '../Header/HeaderComponent';

const DefaultComponent = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      <div className="flex-1">{children}</div>
      <FooterComponent />
    </div>
  );
};

export default DefaultComponent;
