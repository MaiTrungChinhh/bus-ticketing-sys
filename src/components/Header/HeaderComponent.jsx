import logo from 'frontend/src/assets/images/logo.png';
import React, { useEffect, useState } from 'react';
import { IoClose, IoHome } from 'react-icons/io5';
import { LuClock3 } from 'react-icons/lu';
import { PiUserCircleThin } from 'react-icons/pi';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Login from '../../Account/Login';
import RegisterAccount from '../../Account/RegisterAccout';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [roles, setRoles] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username'); // Lấy username từ localStorage
    const roles = localStorage.getItem('roles');

    setRoles(roles);
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);
  const location = useLocation(); // Get the current location

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = () => {
    setIsAccountDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsAccountDropdownOpen(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setRegister(true);
  };

  if (showLogin) {
    return <Login />;
  }

  if (showRegister) {
    return <RegisterAccount />;
  }
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };
  const isHomePage = location.pathname === '/';

  return (
    <div className="header-container w-full font-medium">
      <div className="header-content flex items-center lg:justify-around px-5 lg:px-16 py-8 justify-between">
        <div className="flex items-center">
          <div
            className="menu-toggle lg:hidden cursor-pointer mr-2 pr-3"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <IoClose className="text-3xl" />
            ) : (
              <>
                <div className="menu-line w-8 h-0.5 bg-black my-1"></div>
                <div className="menu-line w-8 h-0.5 bg-black my-1"></div>
                <div className="menu-line w-8 h-0.5 bg-black my-1"></div>
              </>
            )}
          </div>
          <a
            className="logo flex-shrink-0"
            title="Chín Nghĩa - Tất cả vì khách hàng"
            href="/"
          >
            <img src={logo} alt="Logo" className="logo-image h-12 lg:h-24" />
          </a>
        </div>

        <div
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } flex-col lg:flex lg:flex-row lg:items-center lg:ml-10 bg-white lg:bg-transparent lg:relative absolute left-0 w-full lg:w-auto z-10 mt-72 lg:mt-0`}
        >
          <nav
            className={`navigation text-2xl flex items-center ${
              isHomePage ? 'text-white' : 'lg:text-blue-400'
            }`}
          >
            <ul className="nav-list flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0 p-4 lg:p-0">
              {[
                {
                  href: '/',
                  title: 'Trang chủ',
                  icon: <IoHome className="text-3xl" />,
                },
                { href: '/gioi-thieu/', title: 'Giới thiệu' },
                { href: '/bang-gia/', title: 'Bảng giá' },
                { href: '/Tuyen-dung/', title: 'Tuyển dụng' },
                {
                  href: 'https://www.facebook.com/xechinnghia/',
                  title: 'Liên hệ',
                  isExternal: true,
                },
              ].map((item, index) => (
                <li className="nav-item" key={index}>
                  <a
                    className="nav-link lg:hover:text-blue-600"
                    title={item.title}
                    href={item.href}
                    target={item.isExternal ? '_blank' : '_self'}
                    rel={
                      item.isExternal
                        ? 'noopener noreferrer nofollow'
                        : undefined
                    }
                  >
                    {item.icon}
                    {!item.icon && item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="user-account flex items-center space-x-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isLoggedIn ? (
            <div className="relative group account-menu">
              <a
                href="/users/login/"
                className={`flex items-center text-2xl account-link ${
                  isHomePage ? 'text-white' : 'text-blue-400'
                }`}
                title="Tài khoản"
              >
                <PiUserCircleThin className="text-2xl lg:text-4xl account-icon" />
                <span className="hidden lg:inline-block ml-2 account-text">
                  Xin chào, {username} <i className="fa fa-angle-down"></i>
                </span>
              </a>
              <ul
                className={`absolute left-0 w-fit bg-white border border-gray-300 mt-2 ${
                  isAccountDropdownOpen ? 'block' : 'hidden'
                }`}
              >
                <li>
                  {(roles === 'ADMIN' || roles === 'EMPLOYEE') && (
                    <a
                      className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dropdown-item text-2xl whitespace-nowrap"
                      title="Bảng điều khiển"
                      href="/dashboard"
                    >
                      <button className="logout-button">Bảng điều khiển</button>
                    </a>
                  )}
                </li>

                <li>
                  <a
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dropdown-item text-2xl whitespace-nowrap"
                    href="/login"
                    title="Thông tin tài khoản"
                  >
                    <button className="login-button">
                      Thông tin tài khoản
                    </button>
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dropdown-item text-2xl whitespace-nowrap"
                    title="Đăng xuất"
                  >
                    <button onClick={handleLogout} className="logout-button">
                      Đăng xuất
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="relative group account-menu">
              <a
                href="/users/login/"
                className={`flex items-center text-2xl account-link ${
                  isHomePage ? 'text-white' : 'text-blue-400'
                }`}
                title="Tài khoản"
              >
                <PiUserCircleThin className="text-2xl lg:text-4xl account-icon" />
                <span className="hidden lg:inline-block ml-2 account-text">
                  Tài khoản <i className="fa fa-angle-down"></i>
                </span>
              </a>
              <ul
                className={`absolute left-0 w-fit bg-white border border-gray-300 mt-2 ${
                  isAccountDropdownOpen ? 'block' : 'hidden'
                }`}
              >
                <li>
                  <a
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dropdown-item text-2xl whitespace-nowrap"
                    href="/login"
                    title="Đăng nhập"
                  >
                    <button onClick={handleLoginClick} className="login-button">
                      Đăng nhập
                    </button>
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dropdown-item text-2xl whitespace-nowrap"
                    href="/register"
                    title="Đăng ký"
                  >
                    <button
                      onClick={handleLoginClick}
                      className="register-button"
                    >
                      Đăng ký
                    </button>
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dropdown-item text-2xl whitespace-nowrap"
                    href="/users/lostpass/"
                    title="Quên mật khẩu?"
                  >
                    Quên mật khẩu?
                  </a>
                </li>
              </ul>
            </div>
          )}
          <div className="contact-info flex flex-col items-center text-white">
            <a
              href="tel:1900.636.636"
              className="phone-link text-lg lg:text-2xl font-bold flex items-center"
              title="1900.636.636"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="phone-icon text-orange-500"
              >
                <path
                  d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="phone-number ml-2 text-orange-500 lg:text-4xl">
                1900.636.636
              </span>
            </a>
            <p
              className={`working-hours text-base lg:text-2xl ${
                isHomePage ? 'text-white' : 'text-blue-400'
              }`}
            >
              <LuClock3 className="inline-block " /> 05h → 21h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
