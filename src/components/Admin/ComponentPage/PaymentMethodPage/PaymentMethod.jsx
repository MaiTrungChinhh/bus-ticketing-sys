import React, { useEffect, useState } from 'react';
import paymentMethodService from '../../../../services/paymentMethodService';
import AdvancedFilter from '../../DefaultComponent/AdvancedFilter';
import Pagination from '../../DefaultComponent/Pagination';
import PaymentMethodForm from './PaymentMethodForm';
import PaymentMethodTable from './PaymentMethodTable';

const PaymentMethod = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [filteredPaymentMethods, setFilteredPaymentMethods] = useState([]);
    const [editingPaymentMethod, setEditingPaymentMethod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]); // Danh sách vai trò được chọn
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Fetch danh sách phương thức thanh toán
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            setLoading(true);
            try {
                const methods = await paymentMethodService.fetchPaymentMethods(); // Gọi service
                setPaymentMethods(methods);
                setFilteredPaymentMethods(methods);
            } catch (err) {
                setError('Không thể tải dữ liệu phương thức thanh toán.');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentMethods();
    }, []);

    // Lọc dữ liệu dựa trên `searchTerm` và `selectedRoles`
    useEffect(() => {
        const filteredData = paymentMethods.filter((method) => {
            const matchesSearchTerm = (method.methodName || '')
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesRoles =
                selectedRoles.includes('Tất cả') || // Nếu "Tất cả" được chọn, bỏ qua lọc roles
                selectedRoles.length === 0 ||
                (method.roles || []).some((role) => selectedRoles.includes(role));
            return matchesSearchTerm && matchesRoles;
        });
        setFilteredPaymentMethods(filteredData);
    }, [searchTerm, selectedRoles, paymentMethods]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleRoleFilterChange = (role) => {
        if (role === 'Tất cả') {
            // Nếu "Tất cả" được chọn, xóa toàn bộ lựa chọn khác
            setSelectedRoles((prev) =>
                prev.includes(role) ? [] : ['Tất cả']
            );
        } else {
            // Nếu vai trò khác được chọn, loại bỏ "Tất cả"
            setSelectedRoles((prevRoles) =>
                prevRoles.includes(role)
                    ? prevRoles.filter((r) => r !== role)
                    : [...prevRoles.filter((r) => r !== 'Tất cả'), role]
            );
        }
    };

    const handleApplyFilters = (filters) => {
        const { selectedOptions } = filters;
        const appliedRoles = Object.keys(selectedOptions).filter(
            (key) => selectedOptions[key]
        );
        setSelectedRoles(appliedRoles);
    };

    const handleEdit = (id) => {
        const method = paymentMethods.find((m) => m.id === id);
        if (method) {
            setEditingPaymentMethod(method);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phương thức này?')) {
            try {
                await paymentMethodService.deletePaymentMethod(id); // Gọi service
                setPaymentMethods((prev) => prev.filter((m) => m.id !== id));
            } catch {
                setError('Không thể xóa phương thức thanh toán.');
            }
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (editingPaymentMethod) {
                const updatedMethod = await paymentMethodService.updatePaymentMethod(
                    editingPaymentMethod.id,
                    data
                ); // Gọi service
                setPaymentMethods((prev) =>
                    prev.map((m) =>
                        m.id === editingPaymentMethod.id ? updatedMethod : m
                    )
                );
            } else {
                const newMethod = await paymentMethodService.createPaymentMethod(
                    data
                ); // Gọi service
                setPaymentMethods((prev) => [...prev, newMethod]);
            }
            setEditingPaymentMethod(null);
        } catch {
            setError('Không thể lưu phương thức thanh toán.');
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPaymentMethods.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(
        filteredPaymentMethods.length / itemsPerPage
    );

    const uniqueRoles = ['Tất cả', ...new Set(paymentMethods.flatMap((method) => method.roles || []))];

    return (
        <div className="container mx-auto">
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : editingPaymentMethod ? (
                <PaymentMethodForm
                    initialData={editingPaymentMethod}
                    onSubmit={(data) => handleSubmit(data)}
                    onCancel={() => setEditingPaymentMethod(null)}
                />
            ) : (
                <>
                    {/* AdvancedFilter */}
                    <AdvancedFilter
                        filters={[
                            {
                                title: 'Vai Trò',
                                items: uniqueRoles.map((role) => ({
                                    id: role,
                                    label: role,
                                })),
                            },
                        ]}
                        onSearch={handleSearch}
                        onApply={handleApplyFilters}
                        selectedFilters={{
                            roles: selectedRoles,
                        }}
                    />
                    <PaymentMethodTable
                        paymentMethods={currentItems}
                        onEdit={(id) => handleEdit(id)}
                        onDelete={(id) => handleDelete(id)}
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
    );
};

export default PaymentMethod;
