// src/components/Breadcrumb/Breadcrumb.js
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <ul className="flex space-x-2 text-gray-600 text-2xl">
      {' '}
      {/* Thêm text-2xl ở đây */}
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {item.link ? (
            <Link to={item.link} className="hover:text-blue-500">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="mx-2 text-gray-400">
              <svg
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="w-3 h-3"
              >
                <path
                  fill="currentColor"
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                ></path>
              </svg>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
