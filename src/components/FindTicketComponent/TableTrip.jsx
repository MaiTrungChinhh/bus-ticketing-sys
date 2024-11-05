import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTripsInDate } from '../../services/tripService';

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const selectedDeparture = queryParams.get('departure');
  const selectedArrival = queryParams.get('arrival');
  const date = queryParams.get('date');
  const returnDate = queryParams.get('returnDate');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTripsInDate(
          date,
          selectedDeparture,
          selectedArrival
        );

        if (Array.isArray(data)) {
          setBookings(data);
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
    console.log(`Booking ID: ${id}`);
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
                    className="btn btn-primary text-[1.375rem]"
                    onClick={() => book(booking.tripId)}
                  >
                    <i className="fa fa-arrow-right icons-flat bg-btn-actived"></i>{' '}
                    Chọn
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
