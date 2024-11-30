import React from 'react';
import HeaderAdmin from '../../Admin/Header/HeaderAdmin';
import SidebarMenu from '../../Admin/Menu/Sidebar';

const DefaultComponent = ({ children, title }) => {
  return (
    <div className="flex h-screen">
      {/* Menu cố định bên trái */}
      <div className="sticky top-0 h-screen w-64 text-white">
        <SidebarMenu />
      </div>

      {/* Nội dung chính, có thể cuộn dọc */}
      <div className="flex-1 bg-gray-100 overflow-auto">
        <HeaderAdmin pageTitle={title} />
        <div className="container mx-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default DefaultComponent;
