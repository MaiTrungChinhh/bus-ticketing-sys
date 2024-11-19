import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteVehicle } from '../../../../services/vehicleService';

const TableVehicle = ({ bookings }) => {
  const navigate = useNavigate();

  const book = (id) => {
    console.log(`Booking ID: ${id}`);
    navigate(`/buyticket/detail/${id}`);
  };

  const editBooking = (id) => {
    console.log(`Edit Booking ID: ${id}`);
    // Điều hướng đến trang chỉnh sửa xe
    navigate(`/dashboard/vehicle/edit/${id}`);
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      'Bạn có chắc chắn muốn xóa xe này không?'
    );
    if (confirmDelete) {
      try {
        await deleteVehicle(id); // Gọi API xóa xe
        console.log(`Booking with ID: ${id} deleted successfully`);

        // Làm mới danh sách sau khi xóa
        setBookings((prevBookings) => prevBookings.filter((item) => item.id !== id));
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
                Loại xe
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Số ghế
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Màu sắc
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="px-6 py-4 text-xl text-gray-700 text-center">{vehicle.vehicleName || 'N/A'}</td>
                <td className="px-6 py-4 text-xl text-gray-700 text-center">{vehicle.licensePlate || 'N/A'}</td>
                <td className="px-6 py-4 text-xl text-gray-700 text-center">{vehicle.vehicleType?.vehicleTypeName || 'N/A'}</td>
                <td className="px-6 py-4 text-xl text-gray-700 text-center">{vehicle.seatCount || 'N/A'}</td>
                <td className="px-6 py-4 text-xl text-gray-700 text-center">{vehicle.color || 'N/A'}</td>
                <td className="px-6 py-4 text-xl text-gray-700 text-center">{vehicle.status || 'N/A'}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-blue-500 hover:text-blue-600 p-2 m-2 bg-blue-100 hover:bg-blue-200 rounded-xl">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-600 p-2 m-2 bg-red-100 hover:bg-red-200 rounded-xl">
                    Delete
                  </button>
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