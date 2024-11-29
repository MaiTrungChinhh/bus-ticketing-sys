import React, { useState, useEffect } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import ContentAdd from '../../../components/Admin/ComponentPage/BookingTicketPage/ContentAdd';
import { fetchTrips, fetchTripsInDate } from '../../../services/tripService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchRoutes } from '../../../services/routeService';

const ListTripPage = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [selectedArrival, setSelectedArrival] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date()); // Set current date
  const [departureLocations, setDepartureLocations] = useState([]);
  const [arrivalLocations, setArrivalLocations] = useState([]);

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = async () => {
    const formattedDate = departureDate ? formatDate(departureDate) : '';
    try {
      const data = await fetchTripsInDate(
        formattedDate,
        selectedDeparture,
        selectedArrival
      );

      if (Array.isArray(data)) {
        const now = new Date();
        const sixHoursAgo = new Date(now.getTime() + 6 * 60 * 60 * 1000);

        const filteredData = data.filter((trip) => {
          const departureDateTime = new Date(
            `${trip.departureDate}T${trip.departureTime}`
          );
          return departureDateTime >= sixHoursAgo;
        });

        setBookings(filteredData);
        setTotalResults(filteredData.length);
        console.log('Trips fetched:', filteredData);
      } else {
        console.error('Expected data to be an array, but got:', data);
        setBookings([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
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
          setSelectedDeparture(uniqueDepartures[0] || '');
          setSelectedArrival(uniqueArrivals[0] || '');
          setDepartureLocations(uniqueDepartures);
          setArrivalLocations(uniqueArrivals);
        }
      } catch (error) {}
    };

    getRoutes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrips(currentPage, itemsPerPage);

        if (data?.contents && Array.isArray(data.contents)) {
          setBookings(data.contents);
          setTotalResults(data.totalItems || 0);
          setItemsPerPage(data.pageSize || 10);
          setTotalPages(data.totalPages || 1);
          console.log('Trips fetched:', data.contents);
        } else {
          console.error('Unexpected data format:', data);
          setBookings([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultComponent title="List Trips">
      <div className="flex">
        <div className="w-full px-5">
          <ContentAdd bookings={bookings} totalResults={totalResults} />
        </div>
        <div className="booking-form w-1/6 pt-28">
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
                      onChange={(date) => setDepartureDate(date)}
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
          </div>
        </div>
      </div>
    </DefaultComponent>
  );
};

export default ListTripPage;
