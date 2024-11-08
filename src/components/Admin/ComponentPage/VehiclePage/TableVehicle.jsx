import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { deleteVehicle } from '../../../../services/vehicleService';

const TableVehicle = ({ bookings }) => {
  const navigate = useNavigate();

  const book = (id) => {
    console.log(`Booking ID: ${id}`);
    navigate(`/buyticket/detail/${id}`);
  };

  const editBooking = (id) => {
    console.log(`Edit Booking ID: ${id}`);
    // Thêm chức năng điều hướng hoặc chỉnh sửa ở đây
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      'Bạn có chắc chắn muốn xóa đặt chỗ này không?'
    );
    if (confirmDelete) {
      try {
        await deleteVehicle(id);
        console.log(`Booking with ID: ${id} deleted successfully`);
        // Tùy chọn, làm mới danh sách hoặc gọi một hàm để cập nhật dữ liệu
      } catch (error) {
        console.error('Failed to delete booking:', error);
      }
    }
  };

  return (
    <div className="overflow-x-auto mt-4">
      <div className="max-h-[500px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Tên xe
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Biển số xe
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Số lượng ghế
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Màu sắc
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Loại xe
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Trạng thái xe
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
                  {booking.vehicleName || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {booking.licensePlate || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {booking.seatCount || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {booking.color || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {booking.vehicleType?.vehicleTypeName || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {booking.status || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="d-flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-600 p-2 m-2 bg-blue-100 hover:bg-blue-200 rounded-xl"
                      onClick={() => editBooking(booking.id)}
                    >
                      <FaPencilAlt size={15} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 p-2 m-2 bg-blue-100 hover:bg-blue-200 rounded-xl"
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
    </div>
  );
};

export default TableVehicle;
