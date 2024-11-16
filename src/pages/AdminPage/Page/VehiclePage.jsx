import React, { useState, useEffect } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import AdvancedFilter from '../../../components/Admin/DefaultComponent/AdvancedFilter';
import Pagination from '../../../components/Admin/DefaultComponent/Pagination';
import ContentVehicle from '../../../components/Admin/ComponentPage/VehiclePage/ContentVehiclePage';
import { fetchVehicles } from '../../../services/vehicleService';

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

const ListVehiclePage = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    vehicleName: [],
    vehicleType: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVehicles();
        if (Array.isArray(data)) {
          setBookings(data);
          setTotalResults(data.length);
        } else {
          console.error('Expected data to be an array, but got:', data);
          setBookings([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchData();
  }, []);

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
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    setCurrentPage(1);
  };

  const getFilteredResults = () => {
    return bookings.filter((vehicle) => {
      // Filter by vehicle name
      const vehicleNameMatch =
        selectedFilters.vehicleName.length === 0 ||
        selectedFilters.vehicleName.includes(vehicle.vehicle?.vehicleName);

      // Filter by vehicle type
      const vehicleTypeMatch =
        selectedFilters.vehicleType.length === 0 ||
        selectedFilters.vehicleType.includes(
          vehicle.vehicle.vehicleType?.vehicleTypeName
        );

      // Filter by search term
      const searchMatch =
        searchTerm === '' ||
        (vehicle.route?.departureLocation &&
          vehicle.route.departureLocation.toLowerCase().includes(searchTerm)) ||
        (vehicle.route?.arrivalLocation &&
          vehicle.route.arrivalLocation.toLowerCase().includes(searchTerm));

      return vehicleNameMatch && vehicleTypeMatch && searchMatch;
    });
  };

  const filteredResults = getFilteredResults();

  const indexOfLastResult = currentPage * itemsPerPage;
  const indexOfFirstResult = indexOfLastResult - itemsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <DefaultComponent title="List Vehicles">
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
          <ContentVehicle bookings={currentResults} totalResults={totalResults} />
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

export default ListVehiclePage;
