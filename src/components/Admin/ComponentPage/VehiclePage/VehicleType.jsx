import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import vehicleService from '../../../../services/vehicleService';
import AdvancedFilter from '../../DefaultComponent/AdvancedFilter';
import Pagination from '../../DefaultComponent/Pagination';
import VehicleTypeTable from './VehicleTypeTable';

const VehicleType = () => {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [filteredVehicleTypes, setFilteredVehicleTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Mặc định 10 phần tử mỗi trang
    const [loading, setLoading] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({});

    const fetchVehicleTypes = async () => {
        try {
            setLoading(true);
            const data = await vehicleService.fetchVehicleTypes();
            setVehicleTypes(data);
            setFilteredVehicleTypes(data); // Cập nhật dữ liệu ban đầu vào bộ lọc
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Lỗi', text: 'Không thể tải danh sách loại xe.' });
        } finally {
            setLoading(false);
        }
    };

    const handleAddVehicleType = async (name) => {
        if (!name.trim()) {
            Swal.fire({ icon: 'error', title: 'Lỗi', text: 'Tên loại xe không được để trống!' });
            return;
        }
        try {
            await vehicleService.addVehicleType(name);
            Swal.fire({ icon: 'success', title: 'Thành công!', text: 'Loại xe mới đã được thêm.' });
            fetchVehicleTypes();
        } catch {
            Swal.fire({ icon: 'error', title: 'Lỗi', text: 'Không thể thêm loại xe mới.' });
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Bạn có chắc muốn xóa?',
            text: 'Hành động này không thể hoàn tác!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });
        if (confirm.isConfirmed) {
            try {
                await vehicleService.deleteVehicleType(id);
                Swal.fire({ icon: 'success', title: 'Thành công!', text: 'Đã xóa loại xe.' });
                fetchVehicleTypes();
            } catch {
                Swal.fire({ icon: 'error', title: 'Lỗi', text: 'Không thể xóa loại xe này.' });
            }
        }
    };

    const handleApplyFilters = (appliedFilters) => {
        const { selectedOptions } = appliedFilters;

        // Xử lý checkbox "Tất cả"
        if (selectedOptions.all) {
            setFilteredVehicleTypes(vehicleTypes); // Hiển thị toàn bộ dữ liệu
            setSelectedFilters({}); // Xóa tất cả các bộ lọc
            return;
        }

        const selectedVehicleTypeNames = Object.keys(selectedOptions).filter((key) => selectedOptions[key]);

        const filteredData = vehicleTypes.filter((type) =>
            selectedVehicleTypeNames.includes(type.vehicleTypeName)
        );

        setFilteredVehicleTypes(filteredData);
        setSelectedFilters({ ...selectedOptions }); // Cập nhật trạng thái checkbox
    };

    useEffect(() => {
        fetchVehicleTypes();
    }, []);

    useEffect(() => {
        const filteredData = vehicleTypes.filter((type) =>
            type.vehicleTypeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVehicleTypes(filteredData);
    }, [searchTerm, vehicleTypes]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredVehicleTypes.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="flex flex-col gap-4 p-4">
            <AdvancedFilter
                filters={[
                    {
                        title: 'Loại Xe',
                        items: [
                            { id: 'all', label: 'Tất cả', checked: Object.keys(selectedFilters).length === 0 },
                            ...vehicleTypes.map((type) => ({
                                id: type.vehicleTypeName,
                                label: type.vehicleTypeName,
                                checked: !!selectedFilters[type.vehicleTypeName],
                            })),
                        ],
                    },
                ]}
                onSearch={setSearchTerm} // Tìm kiếm theo từ khóa
                onApply={handleApplyFilters} // Áp dụng bộ lọc nâng cao
            />

            <VehicleTypeTable
                vehicleTypes={currentItems}
                onDelete={handleDelete}
                onAddVehicleType={handleAddVehicleType}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredVehicleTypes.length / itemsPerPage)}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newItemsPerPage) => {
                    setItemsPerPage(newItemsPerPage);
                    localStorage.setItem('itemsPerPage', newItemsPerPage); // Lưu số phần tử vào localStorage
                }}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
};

export default VehicleType;
