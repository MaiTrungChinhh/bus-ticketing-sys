import React, { useState, useEffect } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import {
  fetchVehiclesUnassigned,
  fetchDrivers,
  createAssignmentVehicle,
} from '../../../services/tripService';
import { MdAssignmentAdd } from 'react-icons/md';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const breadcrumbItems = [
  {
    label: 'Quản lý phân công',
    link: '/dashboard/vehicle/list',
    className: 'text-3xl ',
  },
  { label: 'Xe chưa phân công', className: 'text-3xl font-bold' },
];

const AddAssignmentVehicle = () => {
  const [loading, setLoading] = useState(false);
  const [vehiclesUnassigned, setTripsUnassigned] = useState([]); // Thêm state cho vehiclesUnassigned

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const data = await fetchVehiclesUnassigned();
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

  const handleAssignDriver = async (vehicleId) => {
    try {
      const drivers = await fetchDrivers();
      if (!drivers.length) {
        return MySwal.fire('Thông báo', 'Không có tài xế khả dụng.', 'warning');
      }

      MySwal.fire({
        title: 'Chọn tài xế và ngày',
        html: `
          <label for="startDate">Ngày bắt đầu:</label>
          <input type="date" id="startDate" class="swal2-input">
          <br/><br/>
          <label for="endDate">Ngày kết thúc:</label>
          <input type="date" id="endDate" class="swal2-input">
          <br/><br/>
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
          const startDate = Swal.getPopup().querySelector('#startDate').value;
          const endDate = Swal.getPopup().querySelector('#endDate').value;

          if (!driverId) {
            Swal.showValidationMessage('Vui lòng chọn tài xế.');
            return false; // Không tiếp tục nếu không chọn tài xế
          }

          if (!startDate || !endDate) {
            Swal.showValidationMessage(
              'Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.'
            );
            return false; // Không tiếp tục nếu không chọn ngày
          }

          // Kiểm tra ngày kết thúc không nhỏ hơn ngày bắt đầu
          if (new Date(startDate) > new Date(endDate)) {
            Swal.showValidationMessage(
              'Ngày kết thúc không thể nhỏ hơn ngày bắt đầu.'
            );
            return false;
          }

          return { driverId, startDate, endDate };
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { driverId, startDate, endDate } = result.value;
          try {
            const assignmentData = { startDate, endDate, vehicleId, driverId };
            console.log('assignmentData:', assignmentData);
            await createAssignmentVehicle(assignmentData);
            MySwal.fire('Thành công', 'Tài xế đã được phân công.', 'success');
            const updatedTrips = await fetchVehiclesUnassigned();
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
    <DefaultComponent title="Danh sách xe chưa phân công">
      <div className="flex items-center">
        <div className="w-full px-5">
          <div className="content-vehicle">
            <div className="card bg-white shadow-md p-5">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            {loading ? (
              <p className="text-center mt-4">Đang tải dữ liệu...</p>
            ) : vehiclesUnassigned.length > 0 ? (
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      {['Tên xe', 'Biển số xe', 'Loại xe', 'Phân công'].map(
                        (header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-2xl font-semibold text-gray-800 text-center"
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vehiclesUnassigned.map((vehicle) => (
                      <tr
                        key={vehicle.id}
                        className="hover:bg-gray-100 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                          {vehicle.vehicleName || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                          {vehicle.licensePlate || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-xl text-gray-700 whitespace-nowrap text-center">
                          {vehicle.vehicleType?.vehicleTypeName || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            className="text-green-500 hover:text-green-600 p-2 bg-green-100 hover:bg-green-200 rounded-xl"
                            onClick={() => handleAssignDriver(vehicle.id)}
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
                Không có xe chưa phân công nào.
              </p>
            )}
          </div>
        </div>
      </div>
    </DefaultComponent>
  );
};

export default AddAssignmentVehicle;
