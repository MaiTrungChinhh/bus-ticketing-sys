import React, { useState, useEffect } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import { fetchTripById, updateTrip } from '../../../services/tripService';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { fetchAllVehicleType } from '../../../services/vehicleTypeService';
import { fetchRoutes } from '../../../services/routeService';
import { fetchVehiclesByIdType } from '../../../services/vehicleService';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useParams } from 'react-router-dom'; // Import để lấy ID từ URL

const breadcrumbItems = [
  {
    label: 'Quản lý chuyến xe',
    link: '/dashboard/trip/list',
    className: 'text-3xl ',
  },
  { label: 'Sửa Chuyến Xe', className: 'text-3xl font-bold' },
];

const EditTripPage = () => {
  const { id } = useParams(); // Lấy ID chuyến xe từ URL
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState([]);
  const [vehicleOptionsByType, setVehicleOptionsByType] = useState([]);
  const [routeOptions, setRoutes] = useState([]);
  const [departureLocations, setDepartureLocations] = useState([]);
  const [arrivalLocations, setArrivalLocations] = useState([]);

  // State để lưu dữ liệu chuyến xe
  const [tripData, setTripData] = useState({
    departureTime: '',
    departureDate: '',
    arrivalDate: '',
    arrivalTime: '',
    vehicleId: '',
    routeId: '',
    vehicleTypeId: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const trip = await fetchTripById(id);
        console.log('Trip data:', trip);

        if (trip?.result) {
          const {
            departureDate,
            departureTime,
            arrivalDate,
            arrivalTime,
            route,
            vehicle,
          } = trip.result;

          setTripData({
            departureTime: departureTime || '',
            departureDate: departureDate || '',
            arrivalDate: arrivalDate || '',
            arrivalTime: arrivalTime || '',
            vehicleId: vehicle?.id || '',
            vehicleTypeId: vehicle?.vehicleType?.id || '',
            routeId: route?.id || '',
            // departureLocation: route?.departureLocation || '',
            // departurePoint: route?.departurePoint || '',
            // arrivalLocation: route?.arrivalLocation || '',
            // arrivalPoint: route?.arrivalPoint || '',
            // distance: route?.distance || '',
            // duration: route?.duration || '',
            // vehicleName: vehicle?.vehicleName || '',
            // licensePlate: vehicle?.licensePlate || '',
          });
        } else {
          console.error('No result found in trip data');
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTripData();
  }, [id]);

  useEffect(() => {
    const getVehicleTypes = async () => {
      try {
        const vehicleTypes = await fetchAllVehicleType();
        setVehicleTypeOptions(
          vehicleTypes.map((type) => ({
            id: type.id,
            name: type.vehicleTypeName,
          }))
        );
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      }
    };

    getVehicleTypes();
  }, []);

  useEffect(() => {
    const loadVehiclesByType = async () => {
      try {
        if (tripData.vehicleTypeId) {
          const vehicles = await fetchVehiclesByIdType(tripData.vehicleTypeId);
          setVehicleOptionsByType(
            vehicles.map((vehicle) => ({
              id: vehicle.id,
              name: vehicle.licensePlate,
            }))
          );
        } else {
          setVehicleOptionsByType([]);
        }
      } catch (error) {
        console.error('Error fetching vehicles by type:', error);
      }
    };

    loadVehiclesByType();
  }, [tripData.vehicleTypeId]);

  useEffect(() => {
    const getRoutes = async () => {
      try {
        const routes = await fetchRoutes();
        setRoutes(routes);
        const uniqueDepartures = [
          ...new Set(routes.map((route) => route.departureLocation)),
        ];
        const uniqueArrivals = [
          ...new Set(routes.map((route) => route.arrivalLocation)),
        ];
        setDepartureLocations(uniqueDepartures);
        setArrivalLocations(uniqueArrivals);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    getRoutes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === 'vehicleTypeId' && { vehicleId: '' }),
    }));
  };

  const handleUpdateTrip = async () => {
    console.log('Updating trip:', tripData);

    const tripUpdatedata = {
      departureTime: tripData.departureTime,
      departureDate: tripData.departureDate,
      arrivalDate: tripData.arrivalDate,
      arrivalTime: tripData.arrivalTime,
      vehicleId: tripData.vehicleId,
      routeId: tripData.routeId,
    };
    console.log('Updating trip:', tripUpdatedata);
    try {
      const response = await updateTrip(id, tripUpdatedata);

      if (response.code === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật chuyến xe thành công!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Thất bại!',
          text: response.message || 'Vui lòng kiểm tra thông tin.',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Error updating trip:', error);
      Swal.fire({
        icon: 'error',
        title: 'Có lỗi xảy ra!',
        text: error.message || 'Vui lòng thử lại sau.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <DefaultComponent title="Sửa Chuyến Xe">
      <div className="w-full py-5">
        <div className="w-full bg-white shadow-md p-5">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="px-5 py-4 bg-white shadow-md rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          {/* Các input tương tự như file thêm */}
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
              className="form-control text-xl p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-60 overflow-y-auto"
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
          onClick={handleUpdateTrip}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Cập Nhật Chuyến Xe
        </button>
        {statusMessage && (
          <div className="mt-3 text-lg text-red-500">{statusMessage}</div>
        )}
      </div>
    </DefaultComponent>
  );
};

export default EditTripPage;
