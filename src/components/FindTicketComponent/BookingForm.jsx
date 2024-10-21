import React from 'react';

const BookingForm = () => {
  const handleSearch = () => {
    // Logic tìm kiếm vé sẽ được thực hiện ở đây
  };

  return (
    <div className="booking-form w-9/12">
      <div className="booking-card rounded-lg p-4 mb-4 relative shadow-md">
        <form className="form" name="bookingPartialForm">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="startPoint"
                className="block text-2xl font-medium text-gray-700" // Kích thước văn bản lớn hơn
              >
                Chọn điểm khởi hành
              </label>
              <div className="flex items-center">
                <i className="fa fa-map-marker text-primary mr-2"></i>
                <select
                  className="form-select w-full border border-gray-300 rounded-md p-2 text-2xl" // Kích thước văn bản lớn hơn cho dropdown
                  name="startPoint"
                  onChange={() => {
                    /* Logic để điền điểm đến */
                  }}
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
            </div>
            <div>
              <label
                htmlFor="endPoint"
                className="block text-2xl font-medium text-gray-700" // Kích thước văn bản lớn hơn
              >
                Chọn điểm đến
              </label>
              <div className="flex items-center">
                <i className="fa fa-map-marker text-primary mr-2"></i>
                <select
                  className="form-select w-full border border-gray-300 rounded-md p-2 text-2xl" // Kích thước văn bản lớn hơn cho dropdown
                  name="endPoint"
                  id="endPoint"
                >
                  <option value="ho-chi-minh" selected="selected">
                    Hồ Chí Minh
                  </option>
                  <option value="binh-duong">Bình Dương</option>
                  <option value="ha-noi">Hà Nội</option>
                  <option value="can-tho">Cần Thơ</option>
                  <option value="daklak">ĐăkLăk</option>
                  <option value="binh-phuoc">Bình Phước</option>
                  <option value="hai-phong">Hải Phòng</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="departureDate"
                className="block text-2xl font-medium text-gray-700" // Kích thước văn bản lớn hơn
              >
                Ngày khởi hành
              </label>
              <div className="flex items-center">
                <i className="fa fa-calendar text-primary mr-2"></i>
                <input
                  type="text"
                  defaultValue="18/10/2024"
                  name="date"
                  id="departureDate"
                  className="form-input border border-gray-300 rounded-md p-2 w-full text-2xl" // Kích thước văn bản lớn hơn cho input
                />
              </div>
            </div>
            <div className="total-price">
              <button
                type="button"
                onClick={handleSearch}
                className="btn btn-search w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition text-2xl" // Kích thước văn bản lớn hơn cho nút
              >
                <i
                  className="fa fa-ticket icons-flat bg-btn-actived"
                  style={{ top: 0 }}
                ></i>{' '}
                Tìm vé
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-col space-y-2">
          <a
            className="btn btn-guide w-full bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 transition mt-2 text-center text-2xl" // Kích thước văn bản lớn hơn cho nút
            title="Hướng dẫn mua vé"
            data-toggle="modal"
            data-target="#blocksearch"
            href="/muave/?action=huongdanmuave"
          >
            Hướng dẫn mua vé
          </a>
          <a
            className="btn btn-regulations w-full bg-gray-300 text-gray-800 font-bold py-2 rounded-md hover:bg-gray-400 transition mt-2 text-center text-2xl" // Kích thước văn bản lớn hơn cho nút
            title="Qui định chung"
            data-toggle="modal"
            data-target="#blocksearch"
            href="/muave/?action=quidinh"
          >
            Qui định chung
          </a>
          <a
            className="btn btn-issues w-full bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-700 transition mt-2 text-center text-2xl" // Kích thước văn bản lớn hơn cho nút
            title="Các lỗi phát sinh"
            data-toggle="modal"
            data-target="#blocksearch"
            href="/muave/?action=cacloiphatsinh"
          >
            Các lỗi phát sinh
          </a>

          <div
            className="modal fade"
            id="blocksearch"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                {/* Nội dung modal sẽ được thêm vào đây */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
