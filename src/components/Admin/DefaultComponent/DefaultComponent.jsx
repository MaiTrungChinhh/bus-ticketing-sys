import React from 'react';
import HeaderAdmin from '../../Admin/Header/HeaderAdmin';
import SidebarMenu from '../../Admin/Menu/Sidebar';

const DefaultComponent = ({ children, title }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar cố định */}
      <div className="sticky top-0 h-screen w-32  text-white">
        <SidebarMenu />
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 bg-gray-100 overflow-y-auto scrollbar scrollbar-track-gray-100 scrollbar-gray-100">
        <HeaderAdmin pageTitle={title} />
        <div className="container mx-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default DefaultComponent;
