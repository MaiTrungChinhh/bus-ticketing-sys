import React, { useState } from 'react';
import './FindTicketComponent.css';
import { MdOutlineLocationOn } from 'react-icons/md';
import { GoArrowSwitch } from 'react-icons/go';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FindTicketComponent = () => {
  const [startDate, setStartDate] = useState(new Date()); // Khởi tạo ngày mặc định
  const [isRoundTrip, setIsRoundTrip] = useState(false); // Trạng thái để xác định vé khứ hồi

  return (
    <div className="form-search">
      <div className="form-header">
        <p className="title">MUA VÉ XE TRỰC TUYẾN</p>
        <p className="subtitle">Nhanh chóng, đơn giản, tiết kiệm thời gian</p>
      </div>
      <div className="form text-center">
        <div className="form-top">
          <a className="click active">
            <span className="desktop">Tìm chuyến xe</span>
            <span className="mobile">Tìm chuyến</span>
          </a>
          <a href="/muave/?action=huongdanmuave" className="guide">
            <span className="desktop">Hướng dẫn mua vé</span>
            <span className="mobile">Hướng dẫn</span>
          </a>
        </div>
        <div className="form-chose-date">
          <div className="radio-group-container">
            <div className="radio-group-custom">
              <label className="radio-wrapper">
                <input
                  type="radio"
                  name="ticket-type"
                  value="false"
                  checked={!isRoundTrip}
                  onChange={() => setIsRoundTrip(false)} // Khi chọn "Một chiều"
                />
                <span>Một chiều</span>
              </label>
              <label className="radio-wrapper">
                <input
                  type="radio"
                  name="ticket-type"
                  value="true"
                  onChange={() => setIsRoundTrip(true)} // Khi chọn "Khứ hồi"
                />
                <span>Khứ hồi</span>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <div className="item address">
                <div className="item-chose departure">
                  <span>
                    <MdOutlineLocationOn
                      style={{ marginRight: '8px' }}
                      color="#0979fd"
                    />
                    Điểm đi
                  </span>
                  <span className="chose">
                    <select
                      className="form-control-x"
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
                  </span>
                </div>
                <div style={{ padding: '0px 30px' }}>
                  <GoArrowSwitch />
                </div>
                <div className="item-chose destination">
                  <span>
                    <MdOutlineLocationOn
                      style={{ marginRight: '8px' }}
                      color="#0979fd"
                    />
                    Điểm đến
                  </span>
                  <span className="chose">
                    <select
                      className="form-control-x"
                      name="endpoin"
                      id="endpoin"
                    >
                      <option value="ho-chi-minh">Hồ Chí Minh</option>
                      <option value="binh-duong">Bình Dương</option>
                      <option value="ha-noi">Hà Nội</option>
                      <option value="can-tho">Cần Thơ</option>
                      <option value="daklak">ĐăkLăk</option>
                      <option value="binh-phuoc">Bình Phước</option>
                      <option value="hai-phong">Hải Phòng</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="item" style={{ width: 'min-content' }}>
                <div className="item-chose departuredate">
                  <span>Ngày khởi hành</span>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="calendar"
                  />
                </div>
              </div>
            </div>

            {/* Chỉ hiển thị cột Ngày Về khi chọn Khứ hồi */}
            {isRoundTrip && (
              <div className="column">
                <div className="item" style={{ width: 'min-content' }}>
                  <div className="item-chose returndate">
                    <span>Ngày Về</span>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="calendar"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="column">
              <span onClick={() => {}} className="btn-search">
                Tìm vé
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindTicketComponent;
