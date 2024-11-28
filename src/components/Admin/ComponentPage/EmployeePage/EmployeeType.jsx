import React, { useEffect, useState } from 'react';
import employeeService from '../../../../services/employeeService';
import AdvancedFilter from '../../DefaultComponent/AdvancedFilter';
import Pagination from '../../DefaultComponent/Pagination';
import EmployeeTypeTable from './EmployeeTypeTable';

export default function EmployeeType() {
    const [employeeTypes, setEmployeeTypes] = useState([]); // Dữ liệu gốc từ API
    const [filteredEmployeeTypes, setFilteredEmployeeTypes] = useState([]); // Dữ liệu đã lọc
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalResults, setTotalResults] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [filterOptions, setFilterOptions] = useState([]); // Tùy chọn checkbox
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Quản lý trạng thái mở/đóng AdvancedFilter

    // Fetch dữ liệu employeeTypes từ API qua service
    const fetchEmployeeTypes = async () => {
        setLoading(true);
        try {
            const result = await employeeService.fetchEmployeeTypes();
            const employeeData = result.contents;

            // Cập nhật dữ liệu và filter options
            setEmployeeTypes(employeeData);
            setFilteredEmployeeTypes(employeeData);
            setFilterOptions([
                { id: 'all', label: 'Tất cả' }, // Thêm tùy chọn "Tất cả"
                ...employeeData.map((item) => ({
                    id: item.id,
                    label: item.nameEmployeeType,
                })),
            ]);
            setTotalResults(result.totalItems || 0);
        } catch (error) {
            console.error('Error fetching employee types:', error);
        } finally {
            setLoading(false);
        }
    };

    // Lọc dữ liệu theo từ khóa và checkbox
    const filterData = () => {
        let filteredData = [...employeeTypes];

        // Lọc theo từ khóa tìm kiếm
        if (searchTerm) {
            filteredData = filteredData.filter((type) =>
                type.nameEmployeeType.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Lọc theo checkbox
        if (selectedFilters.employeeType && selectedFilters.employeeType.length > 0) {
            if (!selectedFilters.employeeType.includes('all')) {
                filteredData = filteredData.filter((type) =>
                    selectedFilters.employeeType.includes(type.id)
                );
            }
        }

        setFilteredEmployeeTypes(filteredData);
        setTotalResults(filteredData.length); // Cập nhật tổng số kết quả
    };

    // Xử lý khi nhấn "Áp dụng" từ bộ lọc
    const handleApplyFilters = (appliedFilters) => {
        const { selectedOptions } = appliedFilters;

        let newFilters = {
            employeeType: Object.keys(selectedOptions).filter((id) => selectedOptions[id]),
        };

        // Nếu chọn "Tất cả", bỏ qua các filter khác
        if (newFilters.employeeType.includes('all')) {
            newFilters = { employeeType: [] }; // Không áp dụng bất kỳ lọc nào
        }

        setSelectedFilters(newFilters);
        setCurrentPage(1); // Reset trang về trang đầu tiên
        setIsFilterOpen(false); // Đóng AdvancedFilter sau khi áp dụng
    };

    // Xử lý tìm kiếm
    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset trang về trang đầu tiên
    };

    // Xóa loại nhân viên qua service
    const handleDelete = async (id) => {
        try {
            await employeeService.deleteEmployeeType(id);
            fetchEmployeeTypes(); // Tải lại dữ liệu sau khi xóa
        } catch (error) {
            console.error('Error deleting employee type:', error);
        }
    };

    // Chia trang dữ liệu
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmployeeTypes.slice(indexOfFirstItem, indexOfLastItem);

    // Tổng số trang
    const totalPages = Math.ceil(totalResults / itemsPerPage);

    useEffect(() => {
        fetchEmployeeTypes();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchTerm, selectedFilters]);

    return (
        <div className="flex flex-col gap-4 p-4">
            <AdvancedFilter
                filters={[
                    {
                        title: 'Loại Nhân Viên',
                        items: filterOptions.map((option) => ({
                            id: option.id,
                            label: option.label,
                            checked:
                                option.id === 'all'
                                    ? selectedFilters.employeeType?.length === 0 // "Tất cả" được chọn nếu không có lọc
                                    : selectedFilters.employeeType?.includes(option.id) || false,
                        })),
                    },
                ]}
                onApply={handleApplyFilters}
                onSearch={handleSearch}
                selectedFilters={selectedFilters}
                isOpen={isFilterOpen} // Trạng thái mở/đóng
                onToggle={() => setIsFilterOpen(!isFilterOpen)} // Thay đổi trạng thái
            />
            <div className="w-full mt-4">
                {loading ? (
                    <div className="text-center">Đang tải...</div>
                ) : (
                    <>
                        <EmployeeTypeTable
                            employeeTypes={currentItems} // Dữ liệu đã phân trang
                            onDelete={handleDelete}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            loading={loading}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            onItemsPerPageChange={setItemsPerPage}
                            itemsPerPage={itemsPerPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
