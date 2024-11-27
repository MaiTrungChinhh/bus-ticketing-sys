import React, { useState } from 'react';
import { useEffect } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import { createTrip } from '../../../services/tripService';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { fetchAllVehicleType } from '../../../services/vehicleTypeService';

const breadcrumbItems = [
  {
    label: 'Quản lý chuyến xe',
    link: '/dashboard/trip/list',
    className: 'text-3xl ',
  },
  { label: 'Tạo Chuyến Xe', className: 'text-3xl font-bold' },
];

const AddTripPage = () => {
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const routeOptions = [
    { id: '101', name: 'Hà Nội - Hồ Chí Minh' },
    { id: '102', name: 'Đà Nẵng - Huế' },
    { id: '103', name: 'Cần Thơ - Nha Trang' },
  ];

  useEffect(() => {
    const loadVehicleOptions = async () => {
      const vehicles = await fetchAllVehicleType();
      if (vehicles.length > 0) {
        // Cập nhật danh sách phương tiện
        const formattedOptions = vehicles.map((vehicle) => ({
          id: vehicle.id,
          name: vehicle.vehicleTypeName,
        }));
        setVehicleOptions(formattedOptions);
      }
    };

    loadVehicleOptions();
  }, []);

  // State để lưu các trường dữ liệu của chuyến đi
  const [tripData, setTripData] = useState({
    departureTime: '',
    departureDate: '',
    arrivalDate: '',
    arrivalTime: '',
    vehicleId: '',
    routeId: '',
  });

  // State để lưu thông báo trạng thái
  const [statusMessage, setStatusMessage] = useState('');

  // Hàm để cập nhật giá trị khi người dùng chọn hoặc nhập
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm để gửi dữ liệu thêm chuyến đi
  const handleAddTrip = async () => {
    try {
      const response = await createTrip(tripData);
      if (response.success) {
        setStatusMessage('Trip added successfully!');
      } else {
        setStatusMessage('Failed to add trip. Please check the details.');
      }
    } catch (error) {
      console.error('Error adding trip:', error);
      setStatusMessage('An error occurred while adding the trip.');
    }
  };

  return (
    <DefaultComponent title="Add New Trip">
      <div className="w-full py-5">
        <div className="w-full bg-white shadow-md p-5">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="px-5 py-4 bg-white shadow-md rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          {/* Thời gian khởi hành */}
          <div>
            <label
              htmlFor="departureTime"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Thời gian khởi hành
            </label>
            <input
              type="time"
              id="departureTime"
              name="departureTime"
              value={tripData.departureTime}
              onChange={handleInputChange}
              className="form-control text-xl"
            />
          </div>

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
            />
          </div>

          {/* Thời gian đến */}
          <div>
            <label
              htmlFor="arrivalTime"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Thời gian đến
            </label>
            <input
              type="time"
              id="arrivalTime"
              name="arrivalTime"
              value={tripData.arrivalTime}
              onChange={handleInputChange}
              className="form-control text-xl"
            />
          </div>

          {/* Phương tiện */}
          <div>
            <label
              htmlFor="vehicleId"
              className="block text-gray-700 font-medium mb-2 text-2xl"
            >
              Phương tiện
            </label>
            <select
              id="vehicleId"
              name="vehicleId"
              value={tripData.vehicleId}
              onChange={handleInputChange}
              className="form-control text-xl"
            >
              <option value="">Chọn Phương Tiện</option>
              {vehicleOptions.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </option>
              ))}
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
              className="form-control text-xl"
            >
              <option value="">Chọn Tuyến</option>
              {routeOptions.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleAddTrip} className="btn btn-primary mt-4 w-full">
          Thêm Chuyến Đi
        </button>

        {statusMessage && <p className="mt-4 text-center">{statusMessage}</p>}
      </div>
    </DefaultComponent>
  );
};

export default AddTripPage;
