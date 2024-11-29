import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormGuestInformation = ({
  selectedSeats,
  onGuestInfoChange,
  tripDetails,
  onContinue,
}) => {
  const [formData, setFormData] = useState({
    hoten: '',
    dienthoai: '',
    email: '',
    kieudon: '',
  });
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();
  const ticketPrice = tripDetails?.ticketPrice;
  const departurePoint = tripDetails?.route.departurePoint;
  useEffect(() => {
    onGuestInfoChange(formData);
  }, [formData, onGuestInfoChange]);

  useEffect(() => {
    // Cập nhật tổng tiền vé mỗi khi ghế được chọn
    const totalAmount = selectedSeats.length * ticketPrice;
    document.getElementById('tongtien').innerText = totalAmount;
  }, [selectedSeats, ticketPrice]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true); // Hiển thị loading spinner

    if (!selectedSeats || selectedSeats.length === 0) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Vui lòng chọn ghế trước khi tiếp tục!',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    try {
      const continueSuccess = await onContinue(e);

      if (continueSuccess) {
        const totalAmount = selectedSeats.length * ticketPrice;

        const encodedSeats = encodeURIComponent(selectedSeats.join(', '));
        const encodedTotalAmount = encodeURIComponent(totalAmount);
        const encodedFullName = encodeURIComponent(formData.hoten);
        const encodedPhoneNumber = encodeURIComponent(formData.dienthoai);
        const encodedEmail = encodeURIComponent(formData.email);
        const encodedPickupPoint = encodeURIComponent(formData.kieudon);
        const encodedTripDetails = encodeURIComponent(
          JSON.stringify(tripDetails)
        );
        navigate(
          `/payment?hoten=${encodedFullName}&dienthoai=${encodedPhoneNumber}&email=${encodedEmail}&kieudon=${encodedPickupPoint}&seats=${encodedSeats}&totalAmount=${encodedTotalAmount}&tripDetails=${encodedTripDetails}`
        );
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
              {selectedSeats.length * ticketPrice}
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
                <label className="block mb-1" htmlFor="departurePoint">
                  Điểm lên xe
                </label>
                <p className="form-control w-full border rounded-lg p-2">
                  {departurePoint}
                </p>
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
