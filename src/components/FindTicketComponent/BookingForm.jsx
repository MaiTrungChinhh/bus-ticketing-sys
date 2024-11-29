import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchRoutes } from '../../services/routeService';
import { useSearchParams } from 'react-router-dom';

const BookingForm = () => {
  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [selectedArrival, setSelectedArrival] = useState('');
  const [departureDate, setDepartureDate] = useState(null); // Initialize as null
  const [departureLocations, setDepartureLocations] = useState([]);
  const [arrivalLocations, setArrivalLocations] = useState([]);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!departureDate) return;

    const formattedDate = formatDate(departureDate);

    navigate(
      `/buyticket?departure=${encodeURIComponent(
        selectedDeparture
      )}&arrival=${encodeURIComponent(selectedArrival)}&date=${formattedDate}`
    );
  };

  // Hàm formatDate để định dạng ngày theo YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Trả về định dạng YYYY-MM-DD
  };

  useEffect(() => {
    const getRoutes = async () => {
      try {
        const routes = await fetchRoutes();
        if (Array.isArray(routes) && routes.length > 0) {
          const uniqueDepartures = [
            ...new Set(routes.map((route) => route.departureLocation)),
          ];
          const uniqueArrivals = [
            ...new Set(routes.map((route) => route.arrivalLocation)),
          ];

          setDepartureLocations(uniqueDepartures);
          setArrivalLocations(uniqueArrivals);
        } else {
        }
      } catch (error) {}
    };

    getRoutes();
  }, []);

  useEffect(() => {
    const departure = searchParams.get('departure');
    const arrival = searchParams.get('arrival');
    const date = searchParams.get('date');
    // const savedDeparture = localStorage.getItem('selectedDeparture');
    // const savedArrival = localStorage.getItem('selectedArrival');
    // const savedDate = localStorage.getItem('startDate');
    // const storedDepartureLocations = localStorage.getItem('departureLocations');
    // const storedArrivalLocations = localStorage.getItem('arrivalLocations');

    // if (storedDepartureLocations) {
    //   setDepartureLocations(JSON.parse(storedDepartureLocations));
    // }
    // if (storedArrivalLocations) {
    //   setArrivalLocations(JSON.parse(storedArrivalLocations));
    // }
    if (departure) setSelectedDeparture(departure);
    if (arrival) setSelectedArrival(arrival);
    if (date) setDepartureDate(new Date(date));
  }, [searchParams]);

  return (
    <div className="booking-form w-9/12">
      <div className="booking-card rounded-lg p-4 mb-4 relative shadow-md">
        <form className="form" name="bookingPartialForm">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="startPoint"
                className="block text-2xl font-medium text-gray-700"
              >
                Chọn điểm khởi hành
              </label>
              <div className="flex items-center">
                <i className="fa fa-map-marker text-primary mr-2"></i>
                <select
                  className="form-select w-full border border-gray-300 rounded-md p-2 text-2xl"
                  name="startPoint"
                  value={selectedDeparture}
                  onChange={(e) => setSelectedDeparture(e.target.value)}
                >
                  {departureLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="endPoint"
                className="block text-2xl font-medium text-gray-700"
              >
                Chọn điểm đến
              </label>
              <div className="flex items-center">
                <i className="fa fa-map-marker text-primary mr-2"></i>
                <select
                  className="form-select w-full border border-gray-300 rounded-md p-2 text-2xl"
                  name="endPoint"
                  id="endPoint"
                  value={selectedArrival}
                  onChange={(e) => setSelectedArrival(e.target.value)}
                >
                  {arrivalLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="departureDate"
                className="block text-2xl font-medium text-gray-700"
              >
                Ngày khởi hành
              </label>
              <div className="flex items-center">
                <i className="fa fa-calendar text-primary mr-2"></i>
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => setDepartureDate(date)} // Update state
                  className="form-input w-full border border-gray-300 rounded-md p-2 text-2xl"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Chọn ngày khởi hành"
                />
              </div>
            </div>
            <div className="total-price">
              <button
                type="button"
                onClick={handleSearch}
                className="btn btn-search w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition text-2xl"
              >
                <i
                  className="fa fa-ticket icons-flat bg-btn-actived"
                  style={{ top: 0 }}
                ></i>
                Tìm vé
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-col space-y-2">
          <a
            className="btn btn-guide w-full bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 transition mt-2 text-center text-2xl"
            title="Hướng dẫn mua vé"
            data-toggle="modal"
            data-target="#blocksearch"
            href="/muave/?action=huongdanmuave"
          >
            Hướng dẫn mua vé
          </a>
          <a
            className="btn btn-regulations w-full bg-gray-300 text-gray-800 font-bold py-2 rounded-md hover:bg-gray-400 transition mt-2 text-center text-2xl"
            title="Qui định chung"
            data-toggle="modal"
            data-target="#blocksearch"
            href="/muave/?action=quidinh"
          >
            Qui định chung
          </a>
          <a
            className="btn btn-issues w-full bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-700 transition mt-2 text-center text-2xl"
            title="Các lỗi phát sinh"
            data-toggle="modal"
            data-target="#blocksearch"
            href="/muave/?action=cacloiphatsinh"
          >
            Các lỗi phát sinh
          </a>
          <div
            className="modal fade"
            id="blocksearch"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                {/* Nội dung modal sẽ được thêm vào đây */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
