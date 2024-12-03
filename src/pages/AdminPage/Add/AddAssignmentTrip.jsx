import React, { useState, useEffect } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import {
  fetchTripsunassigned,
  fetchDrivers,
  createAssignmentTrip,
} from '../../../services/tripService';
import { MdAssignmentAdd } from 'react-icons/md';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const breadcrumbItems = [
  {
    label: 'Quản lý phân công',
    link: '/dashboard/trip/list',
    className: 'text-3xl ',
  },
  { label: 'Chuyến chưa phân công', className: 'text-3xl font-bold' },
];

const AddAssignmentTrip = () => {
  const [loading, setLoading] = useState(false);
  const [tripsUnassigned, setTripsUnassigned] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const data = await fetchTripsunassigned();
        setTripsUnassigned(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Lỗi tải dữ liệu chuyến:', error);
        MySwal.fire(
          'Lỗi',
          'Không thể tải danh sách chuyến chưa phân công.',
          'error'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleAssignDriver = async (tripId) => {
    try {
      const drivers = await fetchDrivers();
      if (!drivers.length) {
        return MySwal.fire('Thông báo', 'Không có tài xế khả dụng.', 'warning');
      }

      MySwal.fire({
        title: 'Chọn tài xế',
        html: `
        <select id="driverSelect" class="swal2-select">
          <option value="">-- Chọn tài xế --</option>
          ${drivers
            .map(
              (driver) =>
                `<option value="${driver.id}">${driver.employeeName} (${driver.phone})</option>`
            )
            .join('')}
        </select>
      `,
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        preConfirm: () => {
          const driverId = Swal.getPopup().querySelector('#driverSelect').value;
          if (!driverId) {
            Swal.showValidationMessage('Vui lòng chọn tài xế.');
          }
          return driverId;
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const driverId = result.value;
          try {
            await createAssignmentTrip(tripId, driverId);
            MySwal.fire('Thành công', 'Tài xế đã được phân công.', 'success');
            const updatedTrips = await fetchTripsunassigned();
            setTripsUnassigned(updatedTrips);
          } catch (error) {
            MySwal.fire('Lỗi', 'Không thể phân công tài xế.', 'error');
          }
        }
      });
    } catch (error) {
      MySwal.fire('Lỗi', 'Không thể tải danh sách tài xế.', 'error');
    }
  };

  return (
    <DefaultComponent title="Danh sách chuyến chưa phân công">
      <div className="flex items-center">
        <div className="w-full px-5">
          <div className="content-trip">
            <div className="card bg-white shadow-md p-5">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            {loading ? (
              <p className="text-center mt-4">Đang tải dữ liệu...</p>
            ) : tripsUnassigned.length > 0 ? (
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      {[
                        'Tuyến',
                        'Ngày giờ khởi hành',
                        'Bến',
                        'Tên xe',
                        'Biển số xe',
                        'Phân công',
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tripsUnassigned.map((trip) => (
                      <tr
                        key={trip.id}
                        className="hover:bg-gray-100 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                          {trip.route?.departureLocation || 'N/A'} -{' '}
                          {trip.route?.arrivalLocation || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                          {trip.departureDate || 'N/A'} <br />
                          {trip.departureTime || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                          {trip.route?.departurePoint || 'N/A'} -{' '}
                          {trip.route?.arrivalPoint || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                          {trip.vehicle?.vehicleName || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                          {trip.vehicle?.licensePlate || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            className="text-green-500 hover:text-green-600 p-2 bg-green-100 hover:bg-green-200 rounded-xl"
                            onClick={() => handleAssignDriver(trip.id)}
                          >
                            <MdAssignmentAdd size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center mt-4">
                Không có chuyến chưa phân công nào.
              </p>
            )}
          </div>
        </div>
      </div>
    </DefaultComponent>
  );
};

export default AddAssignmentTrip;
