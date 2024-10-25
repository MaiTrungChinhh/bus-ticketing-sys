import React from 'react';
import { NavLink } from 'react-router-dom';

const SubMenuItem = ({ label, to }) => (
  <NavLink
    to={to}
    className="block py-2 px-4 rounded hover:bg-gray-600 text-xl"
    activeClassName="bg-gray-700"
  >
    {label}
  </NavLink>
);

export default SubMenuItem;
