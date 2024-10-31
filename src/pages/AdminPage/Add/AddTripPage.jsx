import React, { useState } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import { createTrip } from '../../../services/tripService';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
const breadcrumbItems = [
  {
    label: 'Quản lý chuyến xe',
    link: '/dashboard/trip/list',
    className: 'text-3xl ',
  },
  { label: 'Tạo Chuyến Xe', className: 'text-3xl font-bold' },
];
const AddTripPage = () => {
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

  // Hàm để cập nhật giá trị khi người dùng nhập
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
          <input
            type="time"
            name="departureTime"
            value={tripData.departureTime}
            onChange={handleInputChange}
            placeholder="Departure Time"
            className="form-control"
          />
          <input
            type="date"
            name="departureDate"
            value={tripData.departureDate}
            onChange={handleInputChange}
            placeholder="Departure Date"
            className="form-control"
          />
          <input
            type="date"
            name="arrivalDate"
            value={tripData.arrivalDate}
            onChange={handleInputChange}
            placeholder="Arrival Date"
            className="form-control"
          />
          <input
            type="time"
            name="arrivalTime"
            value={tripData.arrivalTime}
            onChange={handleInputChange}
            placeholder="Arrival Time"
            className="form-control"
          />
          <input
            type="text"
            name="vehicleId"
            value={tripData.vehicleId}
            onChange={handleInputChange}
            placeholder="Vehicle ID"
            className="form-control"
          />
          <input
            type="text"
            name="routeId"
            value={tripData.routeId}
            onChange={handleInputChange}
            placeholder="Route ID"
            className="form-control"
          />
        </div>

        <button onClick={handleAddTrip} className="btn btn-primary mt-4 w-full">
          Add Trip
        </button>

        {statusMessage && <p className="mt-4 text-center">{statusMessage}</p>}
      </div>
    </DefaultComponent>
  );
};

export default AddTripPage;
