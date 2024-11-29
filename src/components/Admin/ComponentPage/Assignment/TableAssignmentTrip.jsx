import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { deleteTrip } from '../../../../services/tripService';

const TableAssignmentTrip = ({ assignmentTrips }) => {
  const navigate = useNavigate();

  const book = (id) => {
    console.log(`AssignmentTrip ID: ${id}`);
    navigate(`/buyticket/detail/${id}`);
  };

  const editAssignmentTrip = (id) => {
    console.log(`Edit AssignmentTrip ID: ${id}`);
  };

  const deleteAssignmentTrip = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this assignmentTrips?'
    );
    if (confirmDelete) {
      try {
        await deleteTrip(id);
        console.log(`AssignmentTrip with ID: ${id} deleted successfully`);
      } catch (error) {
        console.error('Failed to delete assignmentTrips:', error);
      }
    }
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
                Bến (Khởi hành - Đến)
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Tên xe
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Biển số xe
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Tài xế
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Số điên thoại
              </th>
              <th className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {assignmentTrips.map((assignmentTrips) => (
              <tr
                key={assignmentTrips.id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {assignmentTrips.trip.route?.departureLocation} -{' '}
                  {assignmentTrips.trip.route?.arrivalLocation || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {assignmentTrips.trip.arrivalDate ? (
                    <div>
                      {assignmentTrips.trip.arrivalDate} <br />
                      {assignmentTrips.trip.arrivalTime}
                    </div>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {assignmentTrips.trip.route?.departurePoint || 'N/A'} -{' '}
                  {assignmentTrips.trip.route?.arrivalPoint || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {assignmentTrips.trip.vehicle?.vehicleName || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {assignmentTrips.trip.vehicle?.licensePlate || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {assignmentTrips.employee?.employeeName || 'N/A'}
                </td>
                <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                  {assignmentTrips.employee?.phone || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="d-flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-600 p-2 m-2 bg-blue-100 hover:bg-blue-200 rounded-xl"
                      onClick={() => editAssignmentTrip(assignmentTrips.id)}
                    >
                      <FaPencilAlt size={15} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 p-2 m-2 bg-blue-100 hover:bg-blue-200 rounded-xl"
                      onClick={() => deleteAssignmentTrip(assignmentTrips.id)}
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

export default TableAssignmentTrip;
