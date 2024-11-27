import React, { useState, useEffect } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import AdvancedFilter from '../../../components/Admin/DefaultComponent/AdvancedFilter';
import Pagination from '../../../components/Admin/DefaultComponent/Pagination';
import ContentBookingTicket from '../../../components/Admin/ComponentPage/BookingTicketPage/ContentBookingTicket';
import { fetchTickets } from '../../../services/ticketService';

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

const BookTicketPage = () => {
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
        const data = await fetchTickets(currentPage, itemsPerPage);
        console.log('API Response:', data); // Debug phản hồi API
        if (data?.code === 200 && data.result) {
          const { contents, totalItems, pageSize, totalPages } = data.result;
          if (Array.isArray(contents)) {
            setBookings(contents); // Lưu danh sách chuyến đi
            setTotalResults(totalItems || 0); // Tổng số kết quả
            setItemsPerPage(pageSize || 10); // Số kết quả mỗi trang
            setTotalPages(totalPages || 1); // Tổng số trang
            console.log('Trips fetched:', contents);
          } else {
            console.error('Unexpected data format in contents:', contents);
            setBookings([]); // Đặt giá trị mặc định
            setTotalResults(0);
          }
        } else {
          console.error('API response error:', data.message || 'Unknown error');
          setBookings([]); // Đặt giá trị mặc định
          setTotalResults(0);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
        setBookings([]); // Đặt giá trị mặc định trong trường hợp lỗi
        setTotalResults(0);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

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
    <DefaultComponent title="List Booking Ticket">
      <div className="flex">
        <div className="w-1/5">
          <AdvancedFilter
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
          />
        </div>
        <div className="w-4/5 px-5">
          <ContentBookingTicket
            bookings={bookings}
            totalResults={totalResults}
          />
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

export default BookTicketPage;
