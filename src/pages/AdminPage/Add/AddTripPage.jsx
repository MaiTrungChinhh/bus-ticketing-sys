import React, { useState, useEffect } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import { createTrip } from '../../../services/tripService';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { fetchAllVehicleType } from '../../../services/vehicleTypeService';
import { fetchRoutes } from '../../../services/routeService';
import { fetchVehiclesByIdType } from '../../../services/vehicleService';
import Swal from 'sweetalert2'; // Import SweetAlert2

const breadcrumbItems = [
  {
    label: 'Quản lý chuyến xe',
    link: '/dashboard/trip/list',
    className: 'text-3xl ',
  },
  { label: 'Tạo Chuyến Xe', className: 'text-3xl font-bold' },
];

const AddTripPage = () => {
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState([]); // Danh sách loại xe
  const [vehicleOptionsByType, setVehicleOptionsByType] = useState([]); // Danh sách xe theo loại
  const [routeOptions, setRoutes] = useState([]); // Danh sách tuyến
  const [departureLocations, setDepartureLocations] = useState([]); // Danh sách điểm khởi hành
  const [arrivalLocations, setArrivalLocations] = useState([]); // Danh sách điểm đến

  // State để lưu dữ liệu chuyến xe
  const [tripData, setTripData] = useState({
    departureTime: '',
    departureDate: '',
    arrivalDate: '',
    arrivalTime: '',
    vehicleId: '',
    routeId: '',
    vehicleTypeId: '', // Lưu loại xe
  });

  const [statusMessage, setStatusMessage] = useState('');

  // Lấy danh sách loại xe
  useEffect(() => {
    const getVehicleTypes = async () => {
      try {
        const vehicleTypes = await fetchAllVehicleType();
        const formattedVehicleTypes = vehicleTypes.map((type) => ({
          id: type.id,
          name: type.vehicleTypeName,
        }));

        setVehicleTypeOptions(formattedVehicleTypes);
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      }
    };

    getVehicleTypes();
  }, []);

  // Lấy danh sách xe theo loại
  useEffect(() => {
    const loadVehiclesByType = async () => {
      try {
        if (tripData.vehicleTypeId) {
          const vehicles = await fetchVehiclesByIdType(tripData.vehicleTypeId);
          const formattedVehicles = vehicles.map((vehicle) => ({
            id: vehicle.id,
            name: vehicle.licensePlate,
          }));
          setVehicleOptionsByType(formattedVehicles);
        } else {
          setVehicleOptionsByType([]); // Reset vehicle list if no type selected
        }
      } catch (error) {
        console.error('Error fetching vehicles by type:', error);
      }
    };

    loadVehiclesByType();
  }, [tripData.vehicleTypeId]);

  // Lấy danh sách tuyến đường
  useEffect(() => {
    const getRoutes = async () => {
      try {
        const routes = await fetchRoutes();
        if (Array.isArray(routes) && routes.length > 0) {
          setRoutes(routes);

          const uniqueDepartures = [
            ...new Set(routes.map((route) => route.departureLocation)),
          ];
          const uniqueArrivals = [
            ...new Set(routes.map((route) => route.arrivalLocation)),
          ];

          setDepartureLocations(uniqueDepartures);
          setArrivalLocations(uniqueArrivals);
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    getRoutes();
  }, []);

  // Xử lý thay đổi dữ liệu input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === 'vehicleTypeId' && { vehicleId: '' }),
    }));
  };

  // Thêm chuyến xe
  const handleAddTrip = async () => {
    // if (
    //   !tripData.departure ||
    //   !tripData.destination ||
    //   !tripData.date ||
    //   !tripData.time
    // ) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Thiếu thông tin!',
    //     text: 'Vui lòng nhập đầy đủ thông tin trước khi thêm chuyến xe.',
    //     showConfirmButton: true,
    //   });
    //   return; // Dừng hàm nếu dữ liệu không hợp lệ
    // }

    try {
      const response = await createTrip(tripData);

      if (response.code === 201) {
        // Thông báo thành công
        Swal.fire({
          icon: 'success',
          title: 'Thêm chuyến xe thành công!',
          showConfirmButton: false,
          timer: 1500, // Tự động đóng thông báo sau 1.5 giây
        });
      } else {
        // Xử lý khi response code khác 201
        // Thông báo lỗi từ API
        Swal.fire({
          icon: 'error',
          title: 'Thất bại!',
          text: response.message || 'Vui lòng kiểm tra thông tin.',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Error adding trip:', error);
      if (error.response && error.response.data) {
        const apiError = error.response.data;
        const errorMessage = apiError.message || 'Vui lòng thử lại sau.';
        const errorCode = apiError.code || 'Không xác định';
        Swal.fire({
          icon: 'error',
          title: `Lỗi ${errorCode}`,
          text: errorMessage,
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra!',
          text: error.message || 'Vui lòng thử lại sau.',
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <DefaultComponent title="Thêm Chuyến Xe Mới">
      <div className="w-full py-5">
        <div className="w-full bg-white shadow-md p-5">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="px-5 py-4 bg-white shadow-md rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          {/* Ngày khởi hành */}
          <div>
            <label
              htmlFor="departureDate"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Ngày khởi hành
            </label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={tripData.departureDate}
              onChange={handleInputChange}
              className="form-control text-xl"
              required
            />
          </div>

          {/* Thời gian khởi hành */}
          <div>
            <label
              htmlFor="departureTime"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Giờ khởi hành
            </label>
            <input
              type="time"
              id="departureTime"
              name="departureTime"
              value={tripData.departureTime}
              onChange={handleInputChange}
              className="form-control text-xl"
              required
            />
          </div>
          {/* Ngày đến */}
          <div>
            <label
              htmlFor="arrivalDate"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Ngày đến
            </label>
            <input
              type="date"
              id="arrivalDate"
              name="arrivalDate"
              value={tripData.arrivalDate}
              onChange={handleInputChange}
              className="form-control text-xl"
              required
            />
          </div>

          {/* Thời gian đến */}
          <div>
            <label
              htmlFor="arrivalTime"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Giờ đến
            </label>
            <input
              type="time"
              id="arrivalTime"
              name="arrivalTime"
              value={tripData.arrivalTime}
              onChange={handleInputChange}
              className="form-control text-xl"
              required
            />
          </div>

          {/* Loại xe */}
          <div>
            <label
              htmlFor="vehicleTypeId"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Loại Xe
            </label>
            <select
              id="vehicleTypeId"
              name="vehicleTypeId"
              value={tripData.vehicleTypeId}
              onChange={handleInputChange}
              className="form-control text-xl"
              required
            >
              <option value="">Chọn Loại Xe</option>
              {vehicleTypeOptions.map((vehicleType) => (
                <option key={vehicleType.id} value={vehicleType.id}>
                  {vehicleType.name}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn xe */}
          <div>
            <label
              htmlFor="vehicleId"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Chọn Xe
            </label>
            <select
              id="vehicleId"
              name="vehicleId"
              value={tripData.vehicleId}
              onChange={handleInputChange}
              className="form-control text-xl w-fit"
              required
            >
              <option value="">Chọn Xe</option>
              {vehicleOptionsByType.length > 0 ? (
                vehicleOptionsByType.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} {/* Chỉnh sửa để hiển thị biển số */}
                  </option>
                ))
              ) : (
                <option value="">Không có xe nào</option>
              )}
            </select>
          </div>

          {/* Tuyến */}
          <div>
            <label
              htmlFor="routeId"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Tuyến
            </label>
            <select
              id="routeId"
              name="routeId"
              value={tripData.routeId}
              onChange={handleInputChange}
              className="form-control text-xl p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" className="text-gray-500">
                Chọn Tuyến
              </option>
              {routeOptions.map((route) => (
                <option key={route.id} value={route.id} className="text-black">
                  {route.departureLocation} - {route.arrivalLocation}{' '}
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; {route.departurePoint} -{' '}
                  {route.arrivalPoint}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleAddTrip}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Thêm Chuyến Xe
        </button>
        {statusMessage && (
          <div className="mt-3 text-lg text-red-500">{statusMessage}</div>
        )}
      </div>
    </DefaultComponent>
  );
};

export default AddTripPage;
