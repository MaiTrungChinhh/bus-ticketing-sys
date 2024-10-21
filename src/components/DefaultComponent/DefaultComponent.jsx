import React from 'react';
import FooterComponent from '../Footer/FooterComponent';
import HeaderComponent from '../Header/HeaderComponent';
const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </div>
  );
};

export default DefaultComponent;
