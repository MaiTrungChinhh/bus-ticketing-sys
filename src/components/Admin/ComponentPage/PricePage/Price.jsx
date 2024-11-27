import React, { useEffect, useState } from 'react';
import priceService from '../../../../services/priceService';
import AdvancedFilter from '../../DefaultComponent/AdvancedFilter';
import PriceForm from './PriceForm';
import PriceTable from './PriceTable';

const Price = () => {
    const [editingPrice, setEditingPrice] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [prices, setPrices] = useState([]); // Danh sách giá vé đầy đủ
    const [filteredPrices, setFilteredPrices] = useState([]); // Kết quả lọc sau tìm kiếm
    const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm

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
    }, [searchTerm, prices]);

    return (
        <div>
            {/* Thanh tìm kiếm */}
            <AdvancedFilter
                filters={[]} // Không cần thêm bộ lọc nâng cao
                onSearch={handleSearch} // Gọi hàm handleSearch khi nhập từ khóa
                selectedFilters={{}} // Không có bộ lọc được chọn
            />

            {/* Hiển thị bảng giá hoặc form chỉnh sửa */}
            {!editingPrice ? (
                <PriceTable prices={filteredPrices} onEdit={handleEdit} />
            ) : (
                <PriceForm
                    onSubmit={handleFormSubmit}
                    initialData={editingPrice || {}} // Dữ liệu chỉnh sửa hoặc trống
                    routes={routes} // Truyền danh sách tuyến đường
                    vehicleTypes={vehicleTypes} // Truyền danh sách loại xe
                />
            )}
        </div>
    );
};

export default Price;
