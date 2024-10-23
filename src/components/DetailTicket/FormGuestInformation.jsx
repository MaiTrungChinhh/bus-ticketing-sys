import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormGuestInformation = ({ selectedSeats, onGuestInfoChange }) => {
  const [formData, setFormData] = useState({
    hoten: '',
    dienthoai: '',
    email: '',
    kieudon: '',
    magiamgia: '',
  });
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi hàm onGuestInfoChange mỗi khi formData thay đổi
    onGuestInfoChange(formData);
  }, [formData, onGuestInfoChange]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    navigate(
      `/payment?hoten=${formData.hoten}&dienthoai=${formData.dienthoai}&email=${formData.email}&kieudon=${formData.kieudon}&magiamgia=${formData.magiamgia}`
    );
  };

  return (
    <div className="lg:w-1/4 xs:w-full sm:ml-0 md:ml-0 lg:ml-0">
      <div className="border rounded-lg p-4 min-h-[100px]">
        <p className="text-center text-blue-600 uppercase font-bold">
          Thông tin vé
        </p>
        <div id="info_ticket" className="mt-2">
          <p>
            Vị trí đang chọn:{' '}
            <strong id="vitridangchon">
              {selectedSeats.length > 0
                ? selectedSeats.join(', ')
                : 'Chưa chọn'}
            </strong>
          </p>
          <p>
            Tổng tiền vé:{' '}
            <strong id="tongtien" className="text-red-500">
              0
            </strong>{' '}
            VND
          </p>
        </div>
      </div>

      <div className="border rounded-lg p-4 min-h-[400px] mt-4">
        <p className="text-center text-blue-600 uppercase font-bold">
          Thông tin khách hàng
        </p>
        <form id="form-steps" onSubmit={submitForm}>
          <fieldset>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1" htmlFor="hoten">
                  Họ và tên
                </label>
                <input
                  type="text"
                  className="form-control w-full border rounded-lg p-2"
                  name="hoten"
                  id="hoten"
                  maxLength="20"
                  value={formData.hoten}
                  onChange={handleInputChange}
                  placeholder="Nhập họ tên người đi"
                  required
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="dienthoai">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className="form-control w-full border rounded-lg p-2"
                  name="dienthoai"
                  id="dienthoai"
                  maxLength="12"
                  value={formData.dienthoai}
                  onChange={handleInputChange}
                  placeholder="SĐT nhận tin nhắn xác nhận"
                  required
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control w-full border rounded-lg p-2"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="kieudon">
                  Điểm lên xe
                </label>
                <select
                  id="kieudon"
                  name="kieudon"
                  className="form-control w-full border rounded-lg p-2"
                  value={formData.kieudon}
                  onChange={handleInputChange}
                  required
                >
                  {/* Options */}
                  <option value="0">Bx.Chín Nghĩa</option>
                  <option value="103">Thành phố Quảng Ngãi</option>
                  {/* Add other options here */}
                </select>
              </div>
              <div>
                <label className="block mb-1" htmlFor="magiamgia">
                  Mã giảm giá
                </label>
                <input
                  type="text"
                  className="form-control w-full border rounded-lg p-2"
                  name="magiamgia"
                  id="magiamgia"
                  value={formData.magiamgia}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {loading && (
              <div id="pictureUploading" className="col-sm-24 mt-2 text-center">
                <span className="fa fa-refresh fa-spin"></span> Đang tải dữ
                liệu...
              </div>
            )}

            <div className="form-section mt-4">
              <div className="flex justify-between">
                <button
                  type="button"
                  className="btn bg-blue-500 text-white rounded-lg px-4 py-2"
                  onClick={() => window.history.back()}
                >
                  <i className="fa fa-arrow-left"></i> Quay lại
                </button>
                <button
                  name="submit"
                  type="submit"
                  id="submit"
                  className="btn bg-green-500 text-white rounded-lg px-4 py-2"
                >
                  <i className="fa fa-arrow-right"></i> Tiếp tục
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default FormGuestInformation;
