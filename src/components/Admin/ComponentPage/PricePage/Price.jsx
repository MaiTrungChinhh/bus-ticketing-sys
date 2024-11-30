import React, { useEffect, useState } from 'react';
import priceService from '../../../../services/priceService';
import AdvancedFilter from '../../DefaultComponent/AdvancedFilter';
import Pagination from '../../DefaultComponent/Pagination';
import PriceForm from './PriceForm';
import PriceTable from './PriceTable';

const Price = () => {
    const [editingPrice, setEditingPrice] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [prices, setPrices] = useState([]); // Danh sách giá vé đầy đủ
    const [filteredPrices, setFilteredPrices] = useState([]); // Kết quả lọc sau tìm kiếm
    const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch dữ liệu từ API khi component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedRoutes, fetchedVehicleTypes, fetchedPrices] = await Promise.all([
                    priceService.fetchRoutes(),
                    priceService.fetchVehicleTypes(),
                    priceService.fetchPrices(),
                ]);

                setRoutes(fetchedRoutes);
                setVehicleTypes(fetchedVehicleTypes);
                setPrices(fetchedPrices);
                setFilteredPrices(fetchedPrices); // Khởi tạo danh sách lọc bằng dữ liệu gốc
                setTotalPages(Math.ceil(fetchedPrices.length / itemsPerPage));
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu:', err);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (price) => {
        setEditingPrice(price); // Đặt giá vé cần chỉnh sửa
    };

    const handleFormSubmit = (formData) => {
        console.log('Giá trị sau khi lưu:', formData);
        setEditingPrice(null); // Clear sau khi lưu
    };

    // Xử lý tìm kiếm
    const handleSearch = (term) => {
        const lowerSearchTerm = term.toLowerCase();
        setSearchTerm(lowerSearchTerm); // Cập nhật từ khóa tìm kiếm
    };

    // Lọc dữ liệu dựa trên từ khóa
    useEffect(() => {
        const filtered = prices.filter((price) => {
            const departure = price.route?.departureLocation?.toLowerCase() || '';
            const arrival = price.route?.arrivalLocation?.toLowerCase() || '';
            const vehicleType = price.vehicleType?.vehicleTypeName?.toLowerCase() || '';

            return (
                departure.includes(searchTerm) ||
                arrival.includes(searchTerm) ||
                vehicleType.includes(searchTerm)
            );
        });

        setFilteredPrices(filtered); // Cập nhật danh sách lọc
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }, [searchTerm, prices]);
    const indexOfLastResult = currentPage * itemsPerPage;
    const indexOfFirstResult = indexOfLastResult - itemsPerPage;
    const currentResults = filteredPrices.slice(indexOfFirstResult, indexOfLastResult);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Xử lý thay đổi số mục trên mỗi trang
    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi số mục trên mỗi trang
        setTotalPages(Math.ceil(filteredPrices.length / value));
    };
    return (
        <div>
            <AdvancedFilter
                filters={[]} // Không cần thêm bộ lọc nâng cao
                onSearch={handleSearch}
                selectedFilters={{}}
            />

            {!editingPrice ? (
                <>
                    <PriceTable prices={currentResults} onEdit={handleEdit} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        itemsPerPage={itemsPerPage}
                    />
                </>
            ) : (
                <PriceForm
                    onSubmit={handleFormSubmit}
                    initialData={editingPrice || {}}
                    routes={routes}
                    vehicleTypes={vehicleTypes}
                />
            )}
        </div>
    );
};

export default Price;
