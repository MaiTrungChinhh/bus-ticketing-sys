import React, { useEffect, useState } from 'react'; // Thêm useEffect vào đây
import { IoClose } from 'react-icons/io5';
import { PiUserCircleThin } from 'react-icons/pi';

const HeaderAdmin = ({ pageTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [title] = useState(pageTitle);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Thêm state cho việc hủy bỏ thao tác tắt dropdown sau một khoảng thời gian
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout); // Xóa timeout hiện tại nếu có
    }
    setIsAccountDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Đặt timeout để dropdown đóng sau 500ms
    setDropdownTimeout(
      setTimeout(() => {
        setIsAccountDropdownOpen(false);
      }, 500)
    );
  };

  const handleLoginClick = () => {
    console.log('Login button clicked');
  };

  const handleLogout = () => {
    localStorage.clear(); // Xóa tất cả dữ liệu trong localStorage
    setIsLoggedIn(false);
    setUsername('');
    window.location.href = '/'; // Điều hướng về trang chủ
  };

  return (
    <div className="header-container w-full font-medium">
      <div className="header-content flex justify-between px-5 lg:px-16 py-8">
        {/* Title on the left */}
        <div className="header-title flex items-center mr-4">
          <h1 className="text-2xl font-bold text-blue-500">{title}</h1>{' '}
          {/* Sử dụng biến title */}
        </div>

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
        </div>

        <div
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } flex-col lg:flex lg:flex-row lg:items-center lg:ml-10 bg-white lg:bg-transparent lg:relative absolute left-0 w-full lg:w-auto z-10 mt-72 lg:mt-0`}
        >
          <nav className="navigation text-2xl flex items-center">
            <ul className="nav-list flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0 p-4 lg:p-0">
              {/* Remove the Home link */}
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
              <div className="flex items-center text-2xl">
                <PiUserCircleThin className="text-2xl lg:text-4xl account-icon" />
                <span className="hidden lg:inline-block ml-2">
                  Xin chào, {username}
                </span>
              </div>
              <ul
                className={`absolute left-0 w-fit bg-white border border-gray-300 mt-2 ${
                  isAccountDropdownOpen ? 'block' : 'hidden'
                }`}
              >
                <li>
                  <a
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dropdown-item text-2xl whitespace-nowrap"
                    href="/"
                    title="Trang người dùng"
                  >
                    Trang người dùng
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dropdown-item text-2xl whitespace-nowrap"
                    href="/"
                    title="Trang người dùng"
                  >
                    Chỉnh sửa tài khoản
                  </a>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dropdown-item text-2xl whitespace-nowrap"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="relative group account-menu">
              <a
                href="/users/login/"
                className={`flex items-center text-2xl account-link`}
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
                    href="/profile"
                    title="Hồ sơ"
                  >
                    Hồ sơ
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
                <li>
                  <a
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100 dropdown-item text-2xl whitespace-nowrap"
                    href="/logout"
                    title="Đăng xuất"
                  >
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
