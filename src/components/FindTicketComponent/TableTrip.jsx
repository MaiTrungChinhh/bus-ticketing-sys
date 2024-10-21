import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Giả lập dữ liệu
  const mockData = [
    {
      id: 1,
      route: 'Hồ Chí Minh - Hà Nội',
      departureTime: '08:00 AM',
      price: '500,000 VNĐ',
      availableSeats: 20,
      transport: 'Xe Limousine',
    },
    {
      id: 2,
      route: 'Hà Nội - Đà Nẵng',
      departureTime: '09:30 AM',
      price: '700,000 VNĐ',
      availableSeats: 15,
      transport: 'Xe Giường Nằm',
    },
    {
      id: 3,
      route: 'Đà Nẵng - Nha Trang',
      departureTime: '02:00 PM',
      price: '600,000 VNĐ',
      availableSeats: 25,
      transport: 'Xe Khách Thường',
    },
    {
      id: 4,
      route: 'Nha Trang - Hồ Chí Minh',
      departureTime: '06:30 PM',
      price: '650,000 VNĐ',
      availableSeats: 10,
      transport: 'Xe Giường Nằm',
    },
    {
      id: 5,
      route: 'Nha Trang - Hồ Chí Minh',
      departureTime: '06:30 PM',
      price: '650,000 VNĐ',
      availableSeats: 10,
      transport: 'Xe Giường Nằm',
    },
    {
      id: 6,
      route: 'Nha Trang - Hồ Chí Minh',
      departureTime: '06:30 PM',
      price: '650,000 VNĐ',
      availableSeats: 10,
      transport: 'Xe Giường Nằm',
    },
  ];

  // Gọi hàm để lấy dữ liệu
  const fetchBookings = () => {
    setBookings(mockData);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const book = (id) => {
    console.log(`Booking ID: ${id}`);
    navigate(`/buyticket/detail/${id}`);
  };

  return (
    <div className="table-responsive">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              {' '}
              {/* Thay font-medium thành font-bold */}
              Tuyến
            </th>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              {' '}
              {/* Thay font-medium thành font-bold */}
              Giờ xuất bến
            </th>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              {' '}
              {/* Thay font-medium thành font-bold */}
              Giá vé
            </th>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              {' '}
              {/* Thay font-medium thành font-bold */}
              Còn trống
            </th>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              {' '}
              {/* Thay font-medium thành font-bold */}
              Phương tiện
            </th>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              {' '}
              {/* Thay font-medium thành font-bold */}
              Đặt mua
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-6 py-4 whitespace-nowrap text-[1.375rem] text-center">
                {booking.route}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[1.375rem] text-center">
                {booking.departureTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap fare-price text-[1.375rem] text-red-600 text-center">
                {booking.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap empty_number text-[1.375rem] text-center">
                {booking.availableSeats}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[1.375rem] text-center">
                <strong className="text-blue-600">{booking.transport}</strong>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-[1.375rem] text-center">
                <button
                  className="btn btn-primary text-[1.375rem]"
                  onClick={() => book(booking.id)}
                >
                  <i className="fa fa-arrow-right icons-flat bg-btn-actived"></i>{' '}
                  Chọn
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
