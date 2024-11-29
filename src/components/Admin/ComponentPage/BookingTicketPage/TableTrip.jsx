import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { deleteTrip } from '../../../../services/tripService';

const TableTrip = ({ bookings }) => {
  const navigate = useNavigate();

  const book = (id) => {
    console.log(`Booking ID: ${id}`);
    navigate(`/buyticket/detail/${id}`);
  };

  return (
    <div className="overflow-x-auto mt-4">
      <div className="max-h-[500px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Tuyến
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Ngày Giờ khởi hành
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Ngày Giờ đến
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Bến (Khởi hành - Đến)
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Tên xe
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {booking.route?.departureLocation} -{' '}
                  {booking.route?.arrivalLocation || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {booking.departureDate ? (
                    <div>
                      {booking.departureDate} <br />
                      {booking.departureTime}
                    </div>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {booking.arrivalDate ? (
                    <div>
                      {booking.arrivalDate} <br />
                      {booking.arrivalTime}
                    </div>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {booking.route?.departurePoint || 'N/A'} -{' '}
                  {booking.route?.arrivalPoint || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {booking.vehicle?.vehicleName || booking.vehicleName || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="d-flex justify-center">
                    <button
                      className="text-green-500 hover:text-green-600 p-2 m-2 bg-green-100 hover:bg-green-200 rounded-xl"
                      onClick={() => book(booking.id)}
                    >
                      <FaRegCalendarAlt size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTrip;
