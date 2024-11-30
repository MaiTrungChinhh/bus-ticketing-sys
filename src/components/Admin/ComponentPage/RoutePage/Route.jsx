import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import routeService from '../../../../services/routeService';
import AdvancedFilter from '../../DefaultComponent/AdvancedFilter';
import Pagination from '../../DefaultComponent/Pagination';
import RouteForm from './RouteForm';
import RouteTable from './RouteTable';

const Route = () => {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchRoutes = async () => {
        setIsLoading(true);
        try {
            const result = await routeService.fetchRoutes();
            if (result) {
                setRoutes(result.contents);
                setTotalResults(result.totalItems);
            }
        } catch (error) {
            Swal.fire('Lỗi', error.response?.data?.message || 'Không thể lấy danh sách tuyến đường.', 'error');
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchRoutes();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
        setCurrentPage(1);
    };

    const filteredResults = routes.filter((route) =>
        route.departureLocation.toLowerCase().includes(searchTerm) ||
        route.arrivalLocation.toLowerCase().includes(searchTerm) ||
        route.departurePoint.toLowerCase().includes(searchTerm) ||
        route.arrivalPoint.toLowerCase().includes(searchTerm)
    );

    const indexOfLastResult = currentPage * itemsPerPage;
    const indexOfFirstResult = indexOfLastResult - itemsPerPage;
    const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handleEdit = (route) => {
        setSelectedRoute(route);
        setIsEditMode(true);
    };

    const handleDelete = async (route) => {
        const confirm = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn xóa tuyến đường này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });

        if (confirm.isConfirmed) {
            try {
                await routeService.deleteRoute(route.id);
                Swal.fire('Thành công', 'Tuyến đường đã được xóa.', 'success');
                fetchRoutes();
            } catch (error) {
                Swal.fire('Lỗi', 'Không thể xóa tuyến đường.', 'error');
            }
        }
    };

    const handleSave = () => {
        setIsEditMode(false);
        fetchRoutes();
    };

    const handleCancel = () => {
        setIsEditMode(false);
        setSelectedRoute(null);
    };

    const handleAdd = () => {
        navigate('/dashboard/route/add');
    };

    return (
        <div className="flex flex-col gap-4">
            <AdvancedFilter
                filters={[]}
                onApply={() => { }} // Thêm logic nếu cần lọc nâng cao
                onSearch={handleSearch}
            />
            <div className="w-full">
                {isLoading ? (
                    <div className="text-center text-xl text-gray-500">Đang tải...</div>
                ) : isEditMode ? (
                    <RouteForm
                        initialData={selectedRoute}
                        onSubmit={handleSave}
                        onCancel={handleCancel}
                    />
                ) : (
                    <>
                        <RouteTable
                            routes={currentResults}
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

export default Route;
