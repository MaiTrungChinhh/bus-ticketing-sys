import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AdvancedFilter from '../../DefaultComponent/AdvancedFilter';
import Pagination from '../../DefaultComponent/Pagination';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';

const filtersPage1 = [
    {
        title: 'Loại Nhân Viên',
        items: [
            { id: 'all-employees', label: 'Tất cả', checked: true },
            { id: 'manager', label: 'Quản lý', checked: false },
            { id: 'driver', label: 'Tài xế', checked: false },
        ],
    },
    {
        title: 'Trạng Thái',
        items: [
            { id: 'ACTIVE', label: 'Hoạt động', checked: false },
            { id: 'INACTIVE', label: 'Không hoạt động', checked: false },
        ],
    },
];

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [totalResults, setTotalResults] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        employeeType: [],
        status: [],
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isEditMode) {
            fetchEmployees();
        }
    }, [currentPage, itemsPerPage, searchTerm, selectedFilters]);

    const fetchEmployees = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token không tồn tại hoặc đã hết hạn.');
                setIsLoading(false);
                return;
            }

            const params = {
                page: currentPage,
                pageSize: itemsPerPage,
                employeeName: searchTerm ? `like:${searchTerm}` : undefined,
                ...selectedFilters, // Áp dụng các bộ lọc đã chọn vào request
            };

            const response = await axios.get('http://localhost:8080/api/employees', {
                headers: { Authorization: `Bearer ${token}` },
                params,
            });

            if (response.data.result && Array.isArray(response.data.result.contents)) {
                setEmployees(response.data.result.contents);
                setTotalResults(response.data.result.totalItems || 0);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách nhân viên:', error);
            Swal.fire('Lỗi', 'Không thể lấy danh sách nhân viên', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setIsEditMode(true);
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn xóa nhân viên này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });
        if (confirm.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token không tồn tại hoặc đã hết hạn.');
                    return;
                }

                await axios.delete(`http://localhost:8080/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                Swal.fire('Thành công', 'Nhân viên đã được xóa', 'success');
                fetchEmployees();
            } catch (error) {
                console.error('Lỗi khi xóa nhân viên:', error);
                Swal.fire('Lỗi', 'Không thể xóa nhân viên', 'error');
            }
        }
    };

    const handleSave = () => {
        setIsEditMode(false);
        setSelectedEmployee(null);
        fetchEmployees();
    };

    const handleApplyFilters = (appliedFilters) => {
        const { selectedOptions } = appliedFilters;

        const newSelectedFilters = {
            employeeType: Object.keys(selectedOptions)
                .filter(
                    (id) =>
                        selectedOptions[id] &&
                        filtersPage1[0].items.some((item) => item.id === id)
                )
                .map((id) => filtersPage1[0].items.find((item) => item.id === id)?.label),
            status: Object.keys(selectedOptions)
                .filter(
                    (id) =>
                        selectedOptions[id] &&
                        filtersPage1[1].items.some((item) => item.id === id)
                )
                .map((id) => filtersPage1[1].items.find((item) => item.id === id)?.label),
        };

        setSelectedFilters(newSelectedFilters);
        setCurrentPage(1);
    };

    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handleCancel = () => {
        setIsEditMode(false);
        setSelectedEmployee(null);
    };

    const totalPages = Math.ceil(totalResults / itemsPerPage);

    return (
        <div className="flex flex-col gap-4">
            {!isEditMode && (
                <AdvancedFilter
                    filters={filtersPage1}
                    onApply={handleApplyFilters}
                    onSearch={handleSearch}
                    selectedFilters={selectedFilters}
                />
            )}
            <div className="w-full">
                {isLoading ? (
                    <div className="text-center text-xl text-gray-500">Đang tải...</div>
                ) : isEditMode ? (
                    <EmployeeForm
                        initialData={selectedEmployee}
                        onSubmit={handleSave}
                        onCancel={handleCancel}
                    />
                ) : (
                    <>
                        <EmployeeTable
                            employees={employees}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            onItemsPerPageChange={handleItemsPerPageChange}
                            itemsPerPage={itemsPerPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Employee;
