import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import employeeService from '../../../../services/employeeService';
import AdvancedFilter from '../../DefaultComponent/AdvancedFilter';
import Pagination from '../../DefaultComponent/Pagination';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        employeeType: [],
        status: [],
    });
    const [filtersPage1, setFiltersPage1] = useState([]);
    const navigate = useNavigate();

    const fetchFilterOptions = async () => {
        try {
            const employeeTypesResult = await employeeService.fetchEmployeeTypes();
            const employeeTypes = (employeeTypesResult.contents || []).map((type) => ({
                id: type.id,
                label: type.nameEmployeeType,
                checked: false,
            }));

            const statusOptions = [
                { id: 'ACTIVE', label: 'Hoạt động', checked: false },
                { id: 'INACTIVE', label: 'Không hoạt động', checked: false },
            ];

            setFiltersPage1([
                {
                    title: 'Loại Nhân Viên',
                    items: [{ id: 'all-employees', label: 'Tất cả', checked: true }, ...employeeTypes],
                },
                {
                    title: 'Trạng Thái',
                    items: statusOptions,
                },
            ]);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lọc:', error);
            Swal.fire('Lỗi', 'Không thể lấy danh sách bộ lọc.', 'error');
        }
    };

    const filterEmployee = (employees, searchTerm, selectedFilters) => {
        return employees.filter((employee) => {
            const searchMatch =
                searchTerm === '' ||
                employee.employeeName.toLowerCase().includes(searchTerm) ||
                employee.email.toLowerCase().includes(searchTerm) ||
                employee.phone.toLowerCase().includes(searchTerm);

            const employeeTypeMatch =
                selectedFilters.employeeType.length === 0 ||
                selectedFilters.employeeType.includes('all-employees') ||
                selectedFilters.employeeType.includes(employee.employeeType?.id);

            const statusMatch =
                selectedFilters.status.length === 0 ||
                selectedFilters.status.includes(employee.status);

            return searchMatch && employeeTypeMatch && statusMatch;
        });
    };

    const filteredResults = filterEmployee(employees, searchTerm, selectedFilters);

    const indexOfLastResult = currentPage * itemsPerPage;
    const indexOfFirstResult = indexOfLastResult - itemsPerPage;
    const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

    useEffect(() => {
        fetchEmployees();
        fetchFilterOptions();
    }, [searchTerm, selectedFilters]);

    const fetchEmployees = async () => {
        setIsLoading(true);
        try {
            const result = await employeeService.fetchEmployees();
            if (result) {
                setEmployees(result.contents);
                setTotalResults(result.totalItems);
            }
        } catch (error) {
            Swal.fire('Lỗi', 'Không thể lấy danh sách nhân viên.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplyFilters = (appliedFilters) => {
        const { selectedOptions } = appliedFilters;

        const newFilters = {
            employeeType: Object.keys(selectedOptions)
                .filter((key) => selectedOptions[key])
                .filter((key) => filtersPage1[0].items.some((item) => item.id === key))
                .map((key) => key), // Use key as it directly corresponds to the filter ID
            status: Object.keys(selectedOptions)
                .filter((key) => selectedOptions[key])
                .filter((key) => filtersPage1[1].items.some((item) => item.id === key))
                .map((key) => key), // Use key as it directly corresponds to the filter ID
        };

        setSelectedFilters(newFilters);
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setIsEditMode(true);
    };

    const handleDelete = async (employee) => {
        const { id: employeeId, account } = employee;
        const accountId = account?.id;

        const confirm = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn xóa nhân viên này và tài khoản liên quan?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });

        if (confirm.isConfirmed) {
            try {
                await employeeService.deleteEmployee(employeeId);
                if (accountId) {
                    await employeeService.deleteAccount(accountId);
                }
                Swal.fire('Thành công', 'Nhân viên và tài khoản đã được xóa.', 'success');
                fetchEmployees();
            } catch (error) {
                Swal.fire('Lỗi', 'Không thể xóa nhân viên hoặc tài khoản.', 'error');
            }
        }
    };

    const handleSave = () => {
        setIsEditMode(false);
        fetchEmployees();
    };

    const handleCancel = () => {
        setIsEditMode(false);
        setSelectedEmployee(null);
    };

    const handleAdd = () => {
        navigate('/dashboard/employee/add');
    };

    return (
        <div className="flex flex-col gap-4">
            {!isEditMode && filtersPage1.length > 0 && (
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
                            employees={currentResults}
                            loading={isLoading}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onAdd={handleAdd}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
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
