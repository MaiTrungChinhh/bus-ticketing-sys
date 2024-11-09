import React, { useState, useEffect } from 'react';
import { MdOutlineLocationOn } from 'react-icons/md';
import { GoArrowSwitch } from 'react-icons/go';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchRoutes } from '../../services/routeService';

const FindTicketComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [routes, setRoutes] = useState([]);

  const [departureLocations, setDepartureLocations] = useState([]);
  const [arrivalLocations, setArrivalLocations] = useState([]);
  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [selectedArrival, setSelectedArrival] = useState('');

  useEffect(() => {
    const getRoutes = async () => {
      try {
        const response = await fetchRoutes();
        console.log('API Response:', response);

        const routes = response.contents || [];

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
        } else {
          console.error('No routes found in the response:', response);
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    getRoutes();
  }, []);

  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
  };

  // Function to save the selected data to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('selectedDeparture', selectedDeparture);
    localStorage.setItem('selectedArrival', selectedArrival);
    localStorage.setItem('startDate', startDate.toISOString());
    if (isRoundTrip) {
      localStorage.setItem('returnDate', returnDate?.toISOString());
    }
    localStorage.setItem('isRoundTrip', isRoundTrip);

    // Save the arrays of locations as JSON strings
    localStorage.setItem(
      'departureLocations',
      JSON.stringify(departureLocations)
    );
    localStorage.setItem('arrivalLocations', JSON.stringify(arrivalLocations));
  };

  return (
    <div className="p-5 rounded-lg max-w-fit mx-auto">
      <div className="text-center text-white">
        <p className="lg:text-6xl font-bold">MUA VÉ XE TRỰC TUYẾN</p>
        <p className="lg:text-2xl lg:p-10 text-white">
          Nhanh chóng, đơn giản, tiết kiệm thời gian
        </p>
      </div>
      <div className="text-center mt-4">
        <div className="flex space-x-8 justify-center mx-32 sm:mx-52 md:mx-64 lg:mx-96 lg:p-4 lg:text-3xl bg-white rounded-tl-2xl rounded-tr-2xl">
          <Link
            to="#"
            className="px-4 py-2 font-bold text-blue-500 rounded-lg mr-2"
          >
            <span className="hidden sm:inline">Tìm chuyến xe</span>
            <span className="inline sm:hidden">Tìm chuyến</span>
          </Link>
          <Link
            to="/muave/?action=huongdanmuave"
            className="px-4 py-2 text-blue-500 rounded-lg"
          >
            <span className="hidden sm:inline">Hướng dẫn mua vé</span>
            <span className="inline sm:hidden">Hướng dẫn</span>
          </Link>
        </div>

        <div className="flex justify-start p-4 bg-white rounded-tl-2xl rounded-tr-2xl">
          <div className="flex items-center mr-4">
            <label className="flex items-center mr-2">
              <input
                type="radio"
                name="ticket-type"
                value="false"
                checked={!isRoundTrip}
                onChange={() => setIsRoundTrip(false)}
                className="mr-2"
              />
              <span className="text-blue-500 lg:text-2xl">Một chiều</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="ticket-type"
                value="true"
                checked={isRoundTrip}
                onChange={() => setIsRoundTrip(true)}
                className="mr-2"
              />
              <span className="text-blue-500 lg:text-2xl">Khứ hồi</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 bg-white rounded-bl-2xl rounded-br-2xl max-w-full mx-auto p-4">
          <div className="flex items-center justify-center border border-gray-300 rounded-lg col-span-2">
            <div>
              <span className="flex items-center text-gray-800 lg:text-2xl">
                <MdOutlineLocationOn className="mr-2" />
                Điểm đi
              </span>
              <select
                className="ml-2 p-2 text-blue-500 lg:text-2xl"
                value={selectedDeparture}
                onChange={(e) => setSelectedDeparture(e.target.value)}
              >
                <option value="">Chọn điểm đi</option>
                {departureLocations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <GoArrowSwitch className="mx-8 text-blue-500 lg:text-2xl" />
            <div>
              <span className="flex items-center text-gray-800 lg:text-2xl">
                <MdOutlineLocationOn className="mr-2" />
                Điểm đến
              </span>
              <select
                className="ml-2 p-2 text-blue-500 lg:text-2xl"
                value={selectedArrival}
                onChange={(e) => setSelectedArrival(e.target.value)}
              >
                <option value="">Chọn điểm đến</option>
                {arrivalLocations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            className={`flex items-center justify-center border border-gray-300 rounded-lg p-2 col-span-${
              isRoundTrip ? 1 : 2
            }`}
          >
            <div className="w-full text-center">
              <span className="block text-gray-800 lg:text-2xl mb-2">
                Ngày khởi hành
              </span>
              <div className="flex justify-center">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="calendar w-full p-2 text-blue-500 lg:text-2xl text-center"
                />
              </div>
            </div>
          </div>

          {isRoundTrip && (
            <div className="flex items-center justify-center border border-gray-300 rounded-lg p-2 col-span-1">
              <div className="w-full text-center">
                <span className="block text-gray-800 lg:text-2xl mb-2">
                  Ngày Về
                </span>
                <div className="flex justify-center">
                  <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="calendar w-full p-2 text-blue-500 lg:text-2xl text-center"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-4">
            <Link
              to={`/buyticket?departure=${encodeURIComponent(
                selectedDeparture
              )}&arrival=${encodeURIComponent(
                selectedArrival
              )}&date=${formatDate(startDate)}${
                isRoundTrip ? `&returnDate=${formatDate(returnDate)}` : ''
              }`}
              onClick={saveToLocalStorage} // Gọi hàm lưu dữ liệu trước khi chuyển trang
            >
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg lg:text-2xl">
                Tìm vé
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindTicketComponent;
