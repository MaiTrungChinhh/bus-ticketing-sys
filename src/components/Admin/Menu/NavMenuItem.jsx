import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SubMenuItem from './SubMenuItem';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const NavMenuItem = ({
  label,
  to,
  icon,
  subMenus,
  onSubMenuToggle,
  isOpen,
  isHovered,
}) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // Hàm xử lý sự kiện click
  const handleClick = (e) => {
    if (subMenus && Array.isArray(subMenus)) {
      e.preventDefault(); // Ngăn điều hướng nếu có submenu
      setIsSubMenuOpen((prev) => !prev); // Chuyển trạng thái submenu
      onSubMenuToggle(); // Gọi hàm cha để cập nhật ID menu mở
    }
  };

  // Reset trạng thái submenu dựa trên isOpen từ cha
  useEffect(() => {
    if (!isOpen && !isHovered) {
      setIsSubMenuOpen(false); // Đóng submenu khi sidebar bị đóng
    }
  }, [isOpen, isHovered]);

  // Hàm xử lý khi mouse rời khỏi menu item
  const handleMouseLeave = () => {
    if (isOpen || isHovered) {
      return;
    }
    setIsSubMenuOpen(false); // Đóng submenu
  };

  return (
    <div className="mb-2" onMouseLeave={handleMouseLeave}>
      <div
        className="flex justify-between items-center py-2 px-4 rounded cursor-pointer transition-colors duration-200 group"
        onClick={handleClick}
      >
        <div className="flex items-center">
          {icon && (
            <span className="mr-4 text-white text-3xl transition-colors duration-200 group-hover:text-yellow-500">
              {icon}
            </span>
          )}
          <NavLink
            to={subMenus ? '#' : to} // Sử dụng '#' để ngăn điều hướng nếu có subMenus
            className="text-white text-2xl transition-colors duration-200 group-hover:text-yellow-500"
          >
            {label}
          </NavLink>
        </div>
        {subMenus && (
          <span className="ml-2 text-white text-2xl transition-colors duration-200 group-hover:text-yellow-500">
            {isSubMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        )}
      </div>
      <div
        style={{
          maxHeight: isSubMenuOpen ? '500px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out',
        }}
      >
        <div className="pl-4">
          {isSubMenuOpen &&
            subMenus &&
            Array.isArray(subMenus) &&
            subMenus.map((subMenu, index) => (
              <SubMenuItem
                key={index}
                label={subMenu.label}
                to={subMenu.to}
                icon={subMenu.icon}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NavMenuItem;
