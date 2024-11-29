import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { TicketLookup } from '../../services/ticketService';
import DefaultComponent from '../DefaultComponent/DefaultComponent';
import { useNavigate } from 'react-router-dom'; // Correct import

const TicketInfoComponent = () => {
  const [tripDetails, setTripDetails] = useState(null);
  const [ticketLookup, setTicketLookup] = useState({
    ticketId: '',
    phone: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const navigate = useNavigate(); // useNavigate hook

  const openTicketLookupModal = () => {
    Swal.fire({
      title: 'Nhập thông tin vé',
      html: `
        <input id="ticketId" class="swal2-input" placeholder="Mã vé" />
        <input id="phone" class="swal2-input" placeholder="Số điện thoại" />
      `,
      confirmButtonText: 'Tra cứu',
      showCancelButton: true,
      cancelButtonText: 'Trở về trang chủ',
      focusConfirm: false,
      allowOutsideClick: false,
      preConfirm: () => {
        const ticketId = document.getElementById('ticketId').value;
        const phone = document.getElementById('phone').value;
        if (!ticketId || !phone) {
          Swal.showValidationMessage('Vui lòng nhập đầy đủ thông tin!');
          return false;
        }
        setTicketLookup({ ticketId, phone });
        return true;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setIsFormSubmitted(true);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate('/');
      }
    });
  };

  // Gọi API TicketLookup khi form đã được gửi
  useEffect(() => {
    if (isFormSubmitted) {
      TicketLookup(ticketLookup)
        .then((response) => {
          if (response.code === 201) {
            setTripDetails(response.result); // Lưu trữ dữ liệu trả về vào state
            Swal.fire({
              title: 'Tra cứu thành công',
              text: `Thông tin vé đã được tìm thấy.`,
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: 'Lỗi',
              text: 'Vé không tìm thấy hoặc thông tin không đúng.',
              icon: 'error',
            });
          }
        })
        .catch((error) => {
          console.error('Có lỗi xảy ra khi gọi API:', error);
          Swal.fire({
            title: 'Lỗi',
            text: 'Có lỗi xảy ra khi tra cứu vé.',
            icon: 'error',
          });
        });
    }
  }, [isFormSubmitted, ticketLookup]);

  useEffect(() => {
    openTicketLookupModal(); // Mở modal khi component được tải
  }, []);

  return (
    <DefaultComponent>
      <div className="flex-1 p-10">
        {tripDetails && (
          <div className="border rounded-lg shadow-lg p-6 bg-white max-w-3xl mx-auto">
            <h1 className="text-center text-4xl font-bold text-blue-600 mb-6">
              Thông Tin Vé
            </h1>
            <table className="table-auto w-full border-collapse text-2xl">
              <tbody>
                <tr className="border-b py-3">
                  <td className="px-4 font-semibold text-gray-700">Tuyến:</td>
                  <td className="px-4 text-gray-800">
                    {tripDetails?.trip?.route?.departureLocation}
                    <span className="mx-2 text-red-500">→</span>
                    {tripDetails?.trip?.route?.arrivalLocation}
                  </td>
                </tr>
                <tr className="border-b py-3">
                  <td className="px-4 font-semibold text-gray-700">
                    Ngày khởi hành:
                  </td>
                  <td className="px-4 text-gray-800">
                    <strong className="text-red-500">
                      {tripDetails?.trip?.departureDate}
                    </strong>
                    <span className="ml-4 text-gray-600">
                      {tripDetails?.trip?.departureTime}
                    </span>
                  </td>
                </tr>
                <tr className="border-b py-3">
                  <td className="px-4 font-semibold text-gray-700">
                    Họ và tên:
                  </td>
                  <td className="px-4 text-gray-800">
                    {tripDetails?.customer?.customerName}
                  </td>
                </tr>
                <tr className="border-b py-3">
                  <td className="px-4 font-semibold text-gray-700">
                    Số điện thoại:
                  </td>
                  <td className="px-4 text-gray-800">
                    {tripDetails?.customer?.phone}
                  </td>
                </tr>
                <tr className="border-b py-3">
                  <td className="px-4 font-semibold text-gray-700">Email:</td>
                  <td className="px-4 text-gray-800">
                    {tripDetails?.customer?.email}
                  </td>
                </tr>
                <tr className="border-b py-3">
                  <td className="px-4 font-semibold text-gray-700">
                    Điểm lên xe:
                  </td>
                  <td className="px-4 text-gray-800">
                    {tripDetails?.trip?.route?.departurePoint}
                  </td>
                </tr>
                <tr className="border-b py-3">
                  <td className="px-4 font-semibold text-gray-700">
                    Ghế đã chọn:
                  </td>
                  <td className="px-4 text-blue-500 font-semibold">
                    {tripDetails?.trip?.seats?.length > 0
                      ? tripDetails?.trip?.seats.join(', ')
                      : 'Chưa chọn'}
                  </td>
                </tr>
                <tr className="py-3">
                  <td className="px-4 font-semibold text-gray-700">
                    Tổng tiền vé:
                  </td>
                  <td className="px-4 text-red-500 font-bold">
                    {tripDetails?.actualTicketPrice
                      ? tripDetails?.actualTicketPrice.toLocaleString('vi-VN')
                      : 'N/A'}{' '}
                    VND
                  </td>
                </tr>
                <tr className="py-3">
                  <td className="px-4 font-semibold text-gray-700">
                    Biển số xe:
                  </td>
                  <td className="px-4 text-gray-800">
                    {/* Kiểm tra xem thời gian hiện tại có cách thời gian khởi hành không quá 3 giờ */}
                    {tripDetails?.trip?.departureDate &&
                    tripDetails?.trip?.departureTime &&
                    // Kết hợp ngày và giờ khởi hành
                    new Date(
                      `${tripDetails?.trip?.departureDate}T${tripDetails?.trip?.departureTime}`
                    ).getTime() -
                      new Date().getTime() <=
                      3 * 60 * 60 * 1000 &&
                    new Date(
                      `${tripDetails?.trip?.departureDate}T${tripDetails?.trip?.departureTime}`
                    ).getTime() >= new Date().getTime()
                      ? // Nếu đúng thì hiển thị biển số xe
                        tripDetails?.trip?.vehicle?.licensePlate
                      : // Nếu không thì hiển thị thông báo
                        'Biển số xe sẽ cập nhật trước 3 giờ khởi hành'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DefaultComponent>
  );
};

export default TicketInfoComponent;
