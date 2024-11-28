import React from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteTrip } from '../../../../services/tripService';

const TableTrip = ({ bookings }) => {
  const navigate = useNavigate();

  const editBooking = (id) => {
    console.log(`Edit Booking ID: ${id}`);
    // Add navigation or edit functionality here
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this booking?'
    );
    if (confirmDelete) {
      try {
        await deleteTrip(id);
        console.log(`Booking with ID: ${id} deleted successfully`);
      } catch (error) {
        console.error('Failed to delete booking:', error);
      }
    }
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
              Khách Hàng
            </th>
            <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
              Điểm Khởi Hành
            </th>
            <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
              Điểm Đến
            </th>
            <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
              Ngày Đi
            </th>
            <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
              Biển số xe
            </th>
            <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
              Ghế
            </th>
            <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
              Giá Vé
            </th>
            <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
              Phương Thức
            </th>
            <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
              Trạng Thái Vé
            </th>
            <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
              Hành Động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="px-6 py-4 text-xl text-gray-700 text-center">
                {booking.customer?.customerName || 'N/A'}
              </td>
              <td className="px-6 py-4 text-xl text-gray-700 text-center">
                {booking.trip?.route?.departurePoint || 'N/A'}
              </td>
              <td className="px-6 py-4 text-xl text-gray-700 text-center">
                {booking.trip?.route?.arrivalPoint || 'N/A'}
              </td>
              <td className="px-6 py-4 text-xl text-gray-700 text-center">
                <div>
                  {booking.trip?.departureDate || 'N/A'} <br />
                  {booking.trip?.departureTime || 'N/A'}
                </div>
              </td>
              <td className="px-6 py-4 text-xl text-gray-700 text-center">
                {booking.trip.vehicle?.licensePlate || 'N/A'}
              </td>
              <td className="px-6 py-4 text-xl text-gray-700 text-center">
                {booking.seat?.position || 'N/A'}
              </td>
              <td className="px-6 py-4 text-xl text-gray-700 text-center">
                {booking.actualTicketPrice?.toLocaleString() || 'N/A'} VND
              </td>
              <td className="px-6 py-4 text-xl text-gray-700 text-center">
                {booking.paymentMethod?.methodName || 'N/A'}
              </td>
              <td className="px-6 py-4 text-xl text-gray-700 text-center">
                {booking.ticketStatus || 'N/A'}
              </td>
              <td className="px-6 py-4 text-xl text-gray-700 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-600 p-2 bg-blue-100 hover:bg-blue-200 rounded-lg"
                    onClick={() => editBooking(booking.id)}
                  >
                    <FaPencilAlt size={15} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                    onClick={() => deleteBooking(booking.id)}
                  >
                    <FaTrashAlt size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTrip;
