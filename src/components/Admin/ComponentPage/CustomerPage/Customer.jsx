import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AdvancedFilter from '../../DefaultComponent/AdvancedFilter';
import Pagination from '../../DefaultComponent/Pagination';
import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';

const filtersPage1 = [
    {
        title: 'Loại Khách Hàng',
        items: [
            { id: 'all-customers', label: 'Tất cả', checked: true },
            { id: 'guest', label: 'Guest', checked: false },
            { id: 'admin', label: 'Admin', checked: false },
        ],
    },
];

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [totalResults, setTotalResults] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        customerType: [],
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/customers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.data.result && Array.isArray(response.data.result.contents)) {
                setCustomers(response.data.result.contents);
                setTotalResults(response.data.result.contents.length);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách khách hàng:', error);
            Swal.fire('Lỗi', 'Không thể lấy danh sách khách hàng', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setIsEditMode(true);
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn xóa khách hàng này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });
        if (confirm.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/api/customers/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                Swal.fire('Thành công', 'Khách hàng đã được xóa', 'success');
                fetchCustomers();
            } catch (error) {
                console.error('Lỗi khi xóa khách hàng:', error);
                Swal.fire('Lỗi', 'Không thể xóa khách hàng', 'error');
            }
        }
    };

    const handleSave = (updatedCustomer) => {
        setIsEditMode(false);
        setSelectedCustomer(null);
        fetchCustomers();
    };

    const handleApplyFilters = (appliedFilters) => {
        const { selectedOptions } = appliedFilters;

        const newSelectedFilters = {
            customerType: Object.keys(selectedOptions)
                .filter((id) => selectedOptions[id])
                .map((id) => filtersPage1[0].items.find((item) => item.id === id)?.label),
        };

        setSelectedFilters(newSelectedFilters);
        setCurrentPage(1); // Reset về trang đầu
    };


    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
        setCurrentPage(1);
    };

    const filterCustomers = (customers, searchTerm, selectedFilters) => {
        return customers.filter((customer) => {
            const searchMatch =
                searchTerm === '' ||
                customer.customerName.toLowerCase().includes(searchTerm) ||
                customer.email.toLowerCase().includes(searchTerm) ||
                customer.phone.toLowerCase().includes(searchTerm) ||
                customer.account.username.toLowerCase().includes(searchTerm);


            const customerTypeMatch =
                selectedFilters.customerType.length === 0 ||
                selectedFilters.customerType.includes(customer.account.roles[0]);

            return searchMatch && customerTypeMatch;
        });
    };

    const filteredResults = filterCustomers(customers, searchTerm, selectedFilters);

    const indexOfLastResult = currentPage * itemsPerPage;
    const indexOfFirstResult = indexOfLastResult - itemsPerPage;
    const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

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
                    <div className="text-center">Đang tải...</div>
                ) : isEditMode ? (
                    <CustomerForm
                        customer={selectedCustomer}
                        onSave={handleSave}
                        onCancel={() => {
                            setIsEditMode(false);
                            setSelectedCustomer(null);
                        }}
                    />
                ) : (
                    <>
                        <CustomerTable
                            customers={currentResults}
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

export default Customer;
