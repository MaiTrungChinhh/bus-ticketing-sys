import React from 'react';
import SidebarMenu from '../../Admin/Menu/Sidebar';
import HeaderAdmin from '../../Admin/Header/HeaderAdmin';

const DefaultComponent = ({ children, title }) => {
  return (
    <div className="flex h-screen">
      {/* SidebarMenu positioned on the left with fixed width */}
      <div className="">
        <SidebarMenu />
      </div>

      {/* Main content area with HeaderAdmin and dynamic children */}
      <div className="flex-1 bg-gray-100">
        <HeaderAdmin pageTitle={title} />
        <div className="container mx-auto p-4">
          {/* Render children passed to DashboardPage */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultComponent;
