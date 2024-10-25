import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SubMenuItem from './SubMenuItem';

const NavMenuItem = ({ label, to, subMenus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    if (subMenus) {
      e.preventDefault(); // Nếu có submenu, ngăn điều hướng
      setIsOpen(!isOpen); // Mở/đóng submenu
    }
  };

  return (
    <div className="mb-2">
      <div
        className="flex justify-between items-center py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
        onClick={handleClick}
      >
        <NavLink to={subMenus ? '#' : to} className="text-white text-2xl">
          {label}
        </NavLink>
        {subMenus && (
          <span className="ml-2">
            {isOpen ? '-' : '+'} {/* Hiển thị biểu tượng + hoặc - */}
          </span>
        )}
      </div>
      {isOpen && subMenus && (
        <div className="pl-4 transition-all ease-in-out duration-300">
          {subMenus.map((subMenu, index) => (
            <SubMenuItem key={index} label={subMenu.label} to={subMenu.to} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavMenuItem;
