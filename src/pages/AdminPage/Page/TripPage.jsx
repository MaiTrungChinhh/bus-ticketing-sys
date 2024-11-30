import React, { useState, useEffect } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import AdvancedFilter from '../../../components/Admin/DefaultComponent/AdvancedFilter';
import Pagination from '../../../components/Admin/DefaultComponent/Pagination';
import ContentTrip from '../../../components/Admin/ComponentPage/TripPage/ContentTripPage';
import { fetchTrips } from '../../../services/tripService';

const filtersPage1 = [
  {
    title: 'Tên xe',
    items: [
      { id: 'all-vehicles', label: 'Tất cả', checked: true },
      { id: 'bed-seat-vehicle', label: 'Xe Giường Ngồi', checked: false },
      { id: 'lying-bed-vehicle', label: 'Xe Giường Nằm', checked: false },
      { id: 'luxury-vehicle', label: 'Xe Luxury', checked: false },
      { id: 'limousine-vehicle', label: 'Xe Limousine', checked: false },
    ],
  },
  {
    title: 'Loại xe',
    items: [
      { id: 'all-types', label: 'Tất cả', checked: true },
      { id: 'vehicle-22-seats', label: 'Xe 22 chỗ', checked: false },
      { id: 'vehicle-30-seats', label: 'Xe 30 chỗ', checked: false },
      { id: 'vehicle-35-seats', label: 'Xe 35 chỗ', checked: false },
      { id: 'vehicle-40-seats', label: 'Xe 40 chỗ', checked: false },
    ],
  },
];

const ListTripPage = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    vehicleName: [],
    vehicleType: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch data when page or filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrips(currentPage, itemsPerPage); // Gọi API với page và pageSize
        console.log('API Response:', data); // Debug phản hồi API

        // Kiểm tra định dạng dữ liệu
        if (data?.contents && Array.isArray(data.contents)) {
          setBookings(data.contents); // Lưu danh sách chuyến đi
          setTotalResults(data.totalItems || 0); // Tổng số kết quả
          setItemsPerPage(data.pageSize || 10); // Số kết quả mỗi trang
          setTotalPages(data.totalPages || 1); // Tổng số trang
          console.log('Trips fetched:', data.contents);
        } else {
          console.error('Unexpected data format:', data);
          setBookings([]); // Reset bookings nếu không đúng định dạng
          setTotalResults(0);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]); // Gọi lại khi currentPage hoặc itemsPerPage thay đổi

  const handleApplyFilters = (appliedFilters) => {
    const { selectedOptions } = appliedFilters;

    const newSelectedFilters = {
      vehicleName: Object.keys(selectedOptions)
        .filter(
          (id) =>
            selectedOptions[id] &&
            filtersPage1[0].items.some((item) => item.id === id)
        )
        .map(
          (id) => filtersPage1[0].items.find((item) => item.id === id)?.label
        ),
      vehicleType: Object.keys(selectedOptions)
        .filter(
          (id) =>
            selectedOptions[id] &&
            filtersPage1[1].items.some((item) => item.id === id)
        )
        .map(
          (id) => filtersPage1[1].items.find((item) => item.id === id)?.label
        ),
    };

    setSelectedFilters(newSelectedFilters);
    setCurrentPage(1); // Reset về trang đầu khi thay đổi bộ lọc
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  };

  const getFilteredResults = () => {
    return bookings.filter((trip) => {
      // Filter by vehicle name
      const vehicleNameMatch =
        selectedFilters.vehicleName.length === 0 ||
        selectedFilters.vehicleName.includes(trip.vehicle?.vehicleName);

      // Filter by vehicle type
      const vehicleTypeMatch =
        selectedFilters.vehicleType.length === 0 ||
        selectedFilters.vehicleType.includes(
          trip.vehicle.vehicleType?.vehicleTypeName
        );

      // Filter by search term
      const searchMatch =
        searchTerm === '' ||
        (trip.route?.departureLocation &&
          trip.route.departureLocation.toLowerCase().includes(searchTerm)) ||
        (trip.route?.arrivalLocation &&
          trip.route.arrivalLocation.toLowerCase().includes(searchTerm));

      return vehicleNameMatch && vehicleTypeMatch && searchMatch;
    });
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset về trang đầu khi thay đổi số kết quả trên trang
  };

  return (
    <DefaultComponent title="List Trips">
      <div className="flex">
        <div className="w-1/5">
          {/* <AdvancedFilter
            filters={filtersPage1.map((filter) => ({
              ...filter,
              items: filter.items.map((item) => ({
                ...item,
                checked:
                  selectedFilters.vehicleName.includes(item.label) ||
                  selectedFilters.vehicleType.includes(item.label),
              })),
            }))}
            onApply={handleApplyFilters}
            onSearch={handleSearch}
          /> */}
        </div>
        <div className="w-full px-5">
          <ContentTrip bookings={bookings} totalResults={totalResults} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </DefaultComponent>
  );
};

export default ListTripPage;
