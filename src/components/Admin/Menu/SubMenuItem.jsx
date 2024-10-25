import React from 'react';
import { NavLink } from 'react-router-dom';

const SubMenuItem = ({ label, to }) => (
  <NavLink
    to={to}
    className="flex items-center py-2 px-4 rounded hover:bg-gray-600 text-xl text-white"
    activeClassName="bg-gray-700"
  >
    {/* Xóa biểu tượng */}
    {label}
  </NavLink>
);

export default SubMenuItem;
