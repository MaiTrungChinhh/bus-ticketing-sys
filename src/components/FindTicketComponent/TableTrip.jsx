import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTripsInDate } from '../../services/tripService';
import Swal from 'sweetalert2';
import { FcAdvance } from 'react-icons/fc';

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const selectedDeparture = queryParams.get('departure');
  const selectedArrival = queryParams.get('arrival');
  const date = queryParams.get('date');
  const returnDate = queryParams.get('returnDate');

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ về 0:00 để chỉ so sánh ngày

    // Kiểm tra ngày đi
    if (date && new Date(date) < today) {
      Swal.fire({
        icon: 'error',
        title: 'Ngày không hợp lệ',
        text: 'Ngày khởi hành không được nhỏ hơn ngày hiện tại!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchTripsInDate(
          date,
          selectedDeparture,
          selectedArrival
        );
        if (Array.isArray(data)) {
          const now = new Date();
          const sixHoursAgo = new Date(now.getTime() + 6 * 60 * 60 * 1000);

          const filteredData = data.filter((trip) => {
            const departureDateTime = new Date(
              `${trip.departureDate}T${trip.departureTime}`
            );
            return departureDateTime >= sixHoursAgo;
          });
          setBookings(filteredData);
        } else {
          console.error('Expected data to be an array, but got:', data);
          setBookings([]);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    if (date && selectedDeparture && selectedArrival) {
      fetchData();
    }
  }, [date, selectedDeparture, selectedArrival]);

  const book = (id) => {
    navigate(`/buyticket/detail/${id}`);
  };

  return (
    <div className="table-responsive">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              Tuyến
            </th>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              Giờ xuất bến
            </th>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              Điểm lên xe
            </th>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              Giá vé
            </th>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              Còn trống
            </th>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              Phương tiện
            </th>
            <th className="px-6 py-3 text-[1.375rem] font-bold text-black text-center">
              Đặt mua
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-[1.375rem] text-center">
                  {booking.route?.departureLocation} -{' '}
                  {booking.route?.arrivalLocation || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[1.375rem] text-center">
                  {booking.departureDate ? (
                    <div>
                      {booking.departureDate} <br />
                      {booking.departureTime}
                    </div>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[1.375rem] text-center">
                  <strong className="text-blue-600">
                    {booking.route?.departurePoint || 'N/A'}
                  </strong>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[1.375rem] text-red-600 text-center">
                  {booking.ticketPrice || 'N/A'}{' '}
                  {/* Giả định bạn có thuộc tính giá ở đây */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[1.375rem] text-center">
                  {booking.availableSeats || 'N/A'}{' '}
                  {/* Giả định có thuộc tính ghế còn trống */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[1.375rem] text-center">
                  <strong className="text-blue-600">
                    {booking.vehicleName || 'N/A'}
                  </strong>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[1.375rem] text-center">
                  <button
                    className="relative inline-flex items-center text-[1.375rem] pt-2 pb-2 pl-4 pr-4 group rounded-md overflow-hidden bg-blue-200"
                    onClick={() => book(booking.tripId)}
                  >
                    <span className="absolute inset-0 bg-blue-400 transition-all duration-300 group-hover:w-full w-0 z-0"></span>
                    <FcAdvance className="text-2xl mr-2 text-black group-hover:text-white transition-all duration-300 z-10" />
                    <span className="text-black group-hover:text-white transition-all duration-300 z-10">
                      Chọn
                    </span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-red-600">
                Không có chuyến nào phù hợp!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
