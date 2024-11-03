import React from 'react';
import { CiLocationArrow1 } from "react-icons/ci";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoIosMail, IoMdDocument } from "react-icons/io";
import logo from '../../assets/images/logo.png';

const LogoSection = () => {
  return (
    <div className="w-full md:w-1/4 p-4">
      <a href="/home">
        <img src={logo} className="w-3/4" alt="Logo" />
      </a>
      <p className="text-white mt-2 text-xl md:text-2xl">
        {' '}
        {/* Tăng kích thước chữ lên mức lớn hơn */}
        Chúng tôi cung cấp hệ thống đặt vé xe buýt tốt nhất trong cả nước, giúp
        việc di chuyển trở nên dễ dàng và nhanh chóng hơn.
      </p>
    </div>
  );
};

const ContactSection = () => {
  return (
    <div className="w-full md:w-1/4 p-4">
  <h3 className="text-3xl font-semibold mb-4">LIÊN HỆ</h3>  {/* Kích thước lớn hơn cho tiêu đề */ }
      <p className="mb-2 flex items-center text-xl md:text-2xl">
        <IoMdDocument className="mr-2" /> Công ty TNHH Chín Nghĩa
      </p>
      <p className="mb-2 flex items-center text-xl md:text-2xl">
        <FaMapMarkedAlt className="mr-2" /> Địa chỉ: 273 An Dương Vương, Phường 3, Quận 5, Tp. Hồ Chí Minh.
      </p>
      <p className="mb-2 flex items-center text-xl md:text-2xl">
        <FaPhoneVolume className="mr-2" /> Điện thoại: 0987654321
      </p>
      <p className="flex items-center text-xl md:text-2xl">
        <IoIosMail className="mr-2" /> Email: ChinNghia@gmail.com
      <h3 className="text-3xl font-semibold mb-4">LIÊN HỆ</h3>{' '}
      {/* Kích thước lớn hơn cho tiêu đề */}
      <p className="mb-2 text-xl md:text-2xl">Công ty TNHH Chín Nghĩa</p>
      <p className="mb-2 text-xl md:text-2xl">
        Địa chỉ: 273 An Dương Vương, Phường 3, Quận 5, Tp. Hồ Chí Minh.
      </p>
      <p className="mb-2 text-xl md:text-2xl">Điện thoại: 0987654321</p>
      <p className="text-xl md:text-2xl">Email: ChinNghia@gmail.com</p>
    </div>
  );
};

const LinksSection = () => {
  return (
    <div className="w-full md:w-1/4 p-4">
      <h3 className="text-2xl font-semibold mb-4">THÔNG TIN KHÁC</h3>
      <ul>
        <li className="mb-3 text-xl md:text-2xl">
          <a href="/quydinhchung" className="hover:text-yellow-400">
            Quy định chung
          </a>{' '}
          {/* Liên kết tới trang Quy Định Chung */}
        </li>
        <li className="mb-3 text-xl md:text-2xl">
          <a href="/dieukhoanthanhtoan" className="hover:text-yellow-400">
            Điều khoản thanh toán
          </a>
        </li>
        <li className="mb-3 text-xl md:text-2xl">
          <a
            href="/dieukhoan&dieukienthanhtoan"
            className="hover:text-yellow-400"
          >
            Điều khoản và điều kiện sử dụng
          </a>
        </li>
        <li className="text-xl md:text-2xl">
          <a href="/chinhsachbaomat" className="hover:text-yellow-400">
            Chính sách bảo mật
          </a>
        </li>
      </ul>
    </div>
  );
};

const EmailSubscriptionSection = () => {
  return (
    <div className="w-full md:w-1/4 p-4">
      <h3 className="text-3xl font-semibold mb-4">NHẬN THÔNG TIN MỚI NHẤT</h3>
      <form className="flex items-center border-b border-gray-500 pb-2 mb-6">
<<<<<<< HEAD
        <IoIosMail className="mr-2 text-gray-400" />
        <input className="w-full bg-transparent text-gray-300 placeholder-gray-400 focus:outline-none text-xl md:text-2xl" type="email" placeholder="Ex: abc@gmail.com" required />
        <button className="ml-2">
          <CiLocationArrow1 className="text-white" />
=======
        <input
        className="w-full bg-transparent text-gray-300 placeholder-gray-400 focus:outline-none text-xl md:text-2xl"
        type="email"
        placeholder="Ex: abc@gmail.com"
        required
      />
      <button className="ml-2">
        {/* Có thể thay thế biểu tượng bằng một chữ hoặc hình ảnh khác nếu cần */}
        <span className="text-white">→</span>
>>>>>>> f0ebe4abf01fed0c7b4299e0314f85666d0a976e
      </button>
    </form>
    </div >
  );
};

const FooterComponent = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12 flex flex-col">
      <div className="footer-content flex justify-between items-start mx-auto w-11/12 space-x-4">
        <LogoSection />
        <ContactSection />
        <LinksSection />
        <EmailSubscriptionSection />
      </div>
      <hr className="my-4 border-white" />
      <div className="mt-auto text-center text-sm text-gray-300">
        &copy; 2024 ChinhNghia Bus Ticketing | All Rights Reserved
      </div>
    </footer>
  );
};

export default FooterComponent;
