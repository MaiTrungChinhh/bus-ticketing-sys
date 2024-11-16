import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdvancedFilter from '../../DefaultComponent/AdvancedFilter';
import Pagination from '../../DefaultComponent/Pagination';
import EmployeeTypeTable from './EmployeeTypeTable';

export default function EmployeeType() {
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [totalResults, setTotalResults] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({});
    const [loading, setLoading] = useState(false);

    const BASE_URL = 'http://localhost:8080/api/employeeTypes';

    // Fetch employee types with token
    const fetchEmployeeTypes = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found or expired.');
            return;
        }

        setLoading(true);
        try {
            const params = {
                page: currentPage,
                pageSize: itemsPerPage,
                ...(searchTerm && { employeeTypeName: `like:${searchTerm}` }),
                ...selectedFilters,
            };

            const response = await axios.get(BASE_URL, {
                headers: { Authorization: `Bearer ${token}` },
                params,
            });
            if (response.data && response.data.result && Array.isArray(response.data.result.contents)) {
                setEmployeeTypes(response.data.result.contents);
                setTotalResults(response.data.result.totalItems || 0);
            } else {
                setEmployeeTypes([]);
                console.error('Invalid data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching employee types:', error);
            setEmployeeTypes([]);
            if (error.response && error.response.status === 401) {
                console.error('Invalid or expired token.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployeeTypes();
    }, [currentPage, itemsPerPage, searchTerm, selectedFilters]);

    // Delete employee type
    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found or expired.');
            return;
        }

        try {
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (employeeTypes.length === 1 && currentPage > 1) {
                setCurrentPage(prevPage => prevPage - 1); // Go to previous page if last item is deleted
            } else {
                fetchEmployeeTypes(); // Refresh the current page
            }
        } catch (error) {
            console.error('Error deleting employee type:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handleApplyFilters = (appliedFilters) => {
        setSelectedFilters(appliedFilters.selectedOptions);
        setCurrentPage(1);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(totalResults / itemsPerPage);

    return (
        <div className="flex flex-col gap-4 p-4">
            <AdvancedFilter
                filters={[
                    {
                        title: 'Loại Nhân Viên',
                        items: [
                            { id: 'manager', label: 'Quản lý' },
                            { id: 'driver', label: 'Tài xế' },
                        ],
                    },
                ]}
                onApply={handleApplyFilters}
                onSearch={handleSearch}
                selectedFilters={selectedFilters}
            />
            <div className="w-full mt-4">
                {loading ? (
                    <div className="text-center">Đang tải...</div>
                ) : (
                    <>
                        <EmployeeTypeTable
                            employeeTypes={employeeTypes}
                            onDelete={handleDelete}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            loading={loading}
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
}
