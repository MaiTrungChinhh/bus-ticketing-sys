import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { addVehicle, fetchVehicles, updateVehicle, updateVehicleStatus } from '../../../../services/vehicleService';
import AdvancedFilter from '../../DefaultComponent/AdvancedFilter';
import Pagination from '../../DefaultComponent/Pagination';
import VehicleForm from './VehicleForm';
import VehicleTable from './VehicleTable';

const Vehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({ status: [] });
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const fetchedVehicles = await fetchVehicles();
                setVehicles(fetchedVehicles);
            } catch (err) {
                console.error('Error fetching vehicles:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải danh sách xe. Vui lòng kiểm tra lại kết nối.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, []);

    const handleFormSubmit = async (vehicleData) => {
        try {
            if (editingVehicle) {
                const updatedVehicle = await updateVehicle(editingVehicle.id, vehicleData);
                setVehicles((prev) =>
                    prev.map((v) => (v.id === editingVehicle.id ? updatedVehicle : v))
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Thông tin xe đã được cập nhật.',
                });
            } else {
                const newVehicle = await addVehicle(vehicleData);
                setVehicles((prev) => [...prev, newVehicle]);
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Xe mới đã được thêm.',
                });
            }
            setEditingVehicle(null);
        } catch (err) {
            console.error('Error saving vehicle:', err);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không thể lưu xe. Vui lòng thử lại.',
            });
        }
    };

    const handleDelete = async (vehicleId) => {
        const confirm = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Xe sẽ chuyển sang trạng thái ngừng hoạt động!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
        });

        if (confirm.isConfirmed) {
            try {
                await updateVehicleStatus(vehicleId, 'OUT_OF_SERVICE');
                setVehicles((prev) =>
                    prev.map((v) =>
                        v.id === vehicleId ? { ...v, status: 'OUT_OF_SERVICE' } : v
                    )
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Xe đã được chuyển sang trạng thái ngừng hoạt động.',
                });
            } catch (err) {
                console.error('Error updating vehicle status:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể ngừng hoạt động xe. Vui lòng thử lại.',
                });
            }
        }
    };

    const handleEdit = (vehicleId) => {
        const vehicle = vehicles.find((v) => v.id === vehicleId);
        if (vehicle) {
            setEditingVehicle(vehicle);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không tìm thấy xe để chỉnh sửa.',
            });
        }
    };

    const filterVehicles = (vehicles, searchTerm, selectedFilters) => {
        return vehicles.filter((vehicle) => {
            const searchMatch =
                !searchTerm ||
                (vehicle.vehicleName && vehicle.vehicleName.toLowerCase().includes(searchTerm)) ||
                (vehicle.licensePlate && vehicle.licensePlate.toLowerCase().includes(searchTerm)) ||
                (vehicle.color && vehicle.color.toLowerCase().includes(searchTerm));

            const statusMatch =
                selectedFilters.status.length > 0 // Nếu có bộ lọc trạng thái
                    ? selectedFilters.status.includes(vehicle.status) // Chỉ giữ trạng thái phù hợp
                    : true; // Nếu không có bộ lọc trạng thái, hiển thị tất cả

            return searchMatch && statusMatch;
        });
    };


    const handleSearch = (term) => {
        setSearchTerm(term ? term.toLowerCase() : '');
    };

    const handleApplyFilters = (appliedFilters) => {
        const { selectedOptions } = appliedFilters;
        const newFilters = {
            status: Object.keys(selectedOptions).filter((key) => selectedOptions[key]),
        };
        setSelectedFilters(newFilters);

        console.log("Bộ lọc áp dụng:", newFilters); // Log để kiểm tra
    };

    const handleApply = () => {
        const appliedFilters = {
            selectedOptions,
        };
        if (typeof onApply === 'function') {
            onApply(appliedFilters); // Chỉ gọi nếu onApply là một hàm
        } else {
            console.error("onApply is not a function. Please pass a valid function.");
        }
        setIsOpen(false);
    };


    const filteredVehicles = filterVehicles(vehicles, searchTerm, selectedFilters);

    // Pagination logic
    const indexOfLastResult = currentPage * itemsPerPage;
    const indexOfFirstResult = indexOfLastResult - itemsPerPage;
    const currentResults = filteredVehicles.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (itemsPerPage) => {
        setItemsPerPage(itemsPerPage);
        setCurrentPage(1);
    };

    if (loading) {
        return <p>Đang tải danh sách xe...</p>;
    }

    const filters = [
        {
            title: 'Trạng Thái',
            items: [
                { id: 'ACTIVE', label: 'Hoạt động', checked: false },
                { id: 'OUT_OF_SERVICE', label: 'Ngừng hoạt động', checked: false },
            ],
        },
    ];

    return (
        <div className="container mx-auto">
            <AdvancedFilter
                filters={filters}
                onApply={(appliedFilters) => {
                    console.log("Filters Applied:", appliedFilters);
                    handleApplyFilters(appliedFilters); // Gọi hàm xử lý từ component cha
                }}
                onSearch={handleSearch}
            />


            <VehicleTable
                vehicles={currentResults}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                itemsPerPage={itemsPerPage}
            />
            {editingVehicle && (
                <VehicleForm
                    onSubmit={handleFormSubmit}
                    initialData={editingVehicle || {}}
                />
            )}
        </div>
    );
};

export default Vehicle;