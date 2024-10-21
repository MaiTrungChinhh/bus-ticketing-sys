import React, { useState } from 'react';
import { MdOutlineLocationOn } from 'react-icons/md';
import { GoArrowSwitch } from 'react-icons/go';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

const FindTicketComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState();
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  return (
    <div className="p-5 rounded-lg max-w-fit mx-auto">
      <div className="text-center text-white">
        <p className="lg:text-6xl font-bold">MUA VÉ XE TRỰC TUYẾN</p>
        <p className="lg:text-2xl lg:p-10 text-white">
          Nhanh chóng, đơn giản, tiết kiệm thời gian
        </p>
      </div>
      <div className="text-center mt-4 ">
        <div className="flex space-x-8 justify-center mx-32 sm:mx-52 md:mx-64 lg:mx-96 lg:p-4 lg:text-3xl bg-white rounded-tl-2xl rounded-tr-2xl">
          <a className="px-4 py-2 font-bold text-blue-500 rounded-lg mr-2">
            <span className="hidden sm:inline">Tìm chuyến xe</span>
            <span className="inline sm:hidden">Tìm chuyến</span>
          </a>
          <a
            href="/muave/?action=huongdanmuave"
            className="px-4 py-2 text-blue-500 rounded-lg"
          >
            <span className="hidden sm:inline">Hướng dẫn mua vé</span>
            <span className="inline sm:hidden">Hướng dẫn</span>
          </a>
        </div>

        <div className="flex justify-start p-4 bg-white rounded-tl-2xl rounded-tr-2xl">
          <div className="flex items-center mr-4">
            <label className="flex items-center mr-2">
              <input
                type="radio"
                name="ticket-type"
                value="false"
                checked={!isRoundTrip}
                onChange={() => setIsRoundTrip(false)}
                className="mr-2"
              />
              <span className="text-blue-500 lg:text-2xl">Một chiều</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="ticket-type"
                value="true"
                onChange={() => setIsRoundTrip(true)}
                className="mr-2"
              />
              <span className="text-blue-500 lg:text-2xl">Khứ hồi</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 bg-white rounded-bl-2xl rounded-br-2xl max-w-full mx-auto p-4">
          <div className="flex items-center justify-center border border-gray-300 rounded-lg col-span-2">
            <div>
              <span className="flex items-center text-gray-800 lg:text-2xl">
                <MdOutlineLocationOn className="mr-2" />
                Điểm đi
              </span>
              <select
                className="ml-2 p-2 text-blue-500 lg:text-2xl"
                name="startpoin"
                onChange={() => {}}
              >
                <option value="quang-ngai" selected="selected">
                  Quảng Ngãi
                </option>
                <option value="ho-chi-minh">Hồ Chí Minh</option>
                <option value="binh-duong">Bình Dương</option>
                <option value="ha-noi">Hà Nội</option>
                <option value="can-tho">Cần Thơ</option>
                <option value="daklak">ĐăkLăk</option>
                <option value="binh-phuoc">Bình Phước</option>
                <option value="hai-phong">Hải Phòng</option>
              </select>
            </div>
            <GoArrowSwitch className="mx-8 text-blue-500 lg:text-2xl" />
            <div>
              <span className="flex items-center text-gray-800 lg:text-2xl">
                <MdOutlineLocationOn className="mr-2" />
                Điểm đến
              </span>
              <select
                className="ml-2 p-2 text-blue-500 lg:text-2xl"
                name="endpoin"
              >
                <option value="ho-chi-minh">Hồ Chí Minh</option>
                <option value="binh-duong">Bình Dương</option>
                <option value="ha-noi">Hà Nội</option>
                <option value="can-tho">Cần Thơ</option>
                <option value="daklak">ĐăkLăk</option>
                <option value="binh-phuoc">Bình Phước</option>
                <option value="hai-phong">Hải Phòng</option>
              </select>
            </div>
          </div>

          <div
            className={`flex items-center justify-center border border-gray-300 rounded-lg p-2 col-span-${
              isRoundTrip ? 1 : 2
            }`}
          >
            <div className="w-full text-center">
              <span className="block text-gray-800 lg:text-2xl mb-2">
                Ngày khởi hành
              </span>
              <div className="flex justify-center">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="calendar w-full p-2 text-blue-500 lg:text-2xl text-center"
                />
              </div>
            </div>
          </div>

          {isRoundTrip && (
            <div
              className={`flex items-center justify-center border border-gray-300 rounded-lg p-2 col-span-${
                isRoundTrip ? 1 : 2
              }`}
            >
              <div className="w-full text-center">
                <span className="block text-gray-800 lg:text-2xl mb-2">
                  Ngày Về
                </span>
                <div className="flex justify-center">
                  <DatePicker
                    selected={returnDate} // Sử dụng biến riêng cho ngày về
                    onChange={(date) => setReturnDate(date)} // Sử dụng hàm riêng cho ngày về
                    dateFormat="dd/MM/yyyy"
                    className="calendar w-full p-2 text-blue-500 lg:text-2xl text-center"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-4">
            <Link to="/buyticket">
              <button className="bg-blue-500 text-white lg:text-2xl px-6 py-3 rounded-lg hover:bg-blue-900">
                Tìm vé
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindTicketComponent;
