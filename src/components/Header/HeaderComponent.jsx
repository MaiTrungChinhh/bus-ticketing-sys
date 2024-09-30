import React, { useState } from 'react';
import logo from 'frontend/src/assets/images/logo.png';
import 'frontend/src/styles/HomePage.css';
import { PiUserCircleThin } from 'react-icons/pi';
import { IoHome } from 'react-icons/io5';
import { LuClock3 } from 'react-icons/lu';

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="Header">
      <div className="container">
        <div className="menu-bar" onClick={toggleMenu}>
          <span className="line-1"></span>
          <span className="line-2"></span>
          <span className="line-3"></span>
        </div>
        <a
          className="logo"
          title="Chín Nghĩa - Tất cả vì khách hàng"
          href="/home"
        >
          <img src={logo} alt="Logo" />
        </a>
        <div className={`header-nav-container ${isMenuOpen ? 'active' : ''}`}>
          <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <a className="home" title="Trang chủ" href="/home">
                  <IoHome />
                </a>
              </li>
              <li className="nav-item">
                <a className="a-img" href="/gioi-thieu/" title="Giới thiệu">
                  Giới thiệu
                </a>
              </li>
              <li className="nav-item">
                <a className="a-img" href="/bang-gia/" title="Bảng giá">
                  Bảng giá
                </a>
              </li>
              <li className="nav-item">
                <a className="a-img" href="/Tuyen-dung/" title="Tuyển dụng">
                  Tuyển dụng
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="a-img"
                  href="https://www.facebook.com/xechinnghia/"
                  title="Liên hệ"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="account-header">
          <div className="account">
            <a href="/users/login/" alt="user" className="account-link">
              <PiUserCircleThin className="icon-large" />
              <span className="text">
                Tài khoản <i className="fa fa-angle-down"></i>
              </span>
            </a>
            <ul className="dropdown-list">
              <li>
                <a className="login" href="/users/login/" title="Đăng nhập">
                  Đăng nhập
                </a>
              </li>
              <li>
                <a href="/users/register/" title="Đăng ký">
                  Đăng ký
                </a>
              </li>
              <li>
                <a href="/users/lostpass/" title="Quên mật khẩu?">
                  Quên mật khẩu?
                </a>
              </li>
            </ul>
          </div>
          <div className="hotline">
            <a href="tel:1900.636.636" className="bold" title="1900.636.636">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                  fill="#f79321"
                ></path>
              </svg>
              <span className="text">1900.636.636</span>
            </a>
            <p className="mb-0 time">
              <LuClock3 /> 05h → 21h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
