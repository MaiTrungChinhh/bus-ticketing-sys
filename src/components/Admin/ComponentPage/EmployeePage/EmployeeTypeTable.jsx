import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EmployeeTypeTable = ({ onEdit, onDelete, employeeTypes, fetchEmployeeTypes, totalPages, currentPage, onPageChange, loading }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof fetchEmployeeTypes === 'function') {
            fetchEmployeeTypes(currentPage);
        }
    }, [currentPage, fetchEmployeeTypes]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };
    const renderPagination = () => {
        if (totalPages > 1) { // Hiển thị phân trang chỉ khi có hơn 1 trang
            const pageNumbers = [];
    
            if (totalPages <= 4) {
                // Hiển thị tất cả các trang nếu tổng số trang nhỏ hơn hoặc bằng 4
                for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                // Trường hợp tổng số trang lớn hơn 4
                if (currentPage <= 3) {
                    // Hiển thị các trang đầu tiên và dấu ba chấm, trang cuối
                    pageNumbers.push(1, 2, 3, '...', totalPages);
                } else if (currentPage > 3 && currentPage < totalPages - 2) {
                    // Hiển thị trang đầu, dấu ba chấm, các trang giữa, dấu ba chấm, trang cuối
                    pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                } else {
                    // Hiển thị các trang cuối cùng và dấu ba chấm, trang đầu
                    pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
                }
            }
    
            return (
                <div className="flex justify-center items-center space-x-2 mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        &lt;
                    </button>
                    {pageNumbers.map((number, index) => (
                        <button
                            key={index}
                            onClick={() => typeof number === 'number' && handlePageChange(number)}
                            className={`px-4 py-2 rounded ${
                                currentPage === number ? 'bg-blue-500 text-white' : 
                                number === '...' ? 'bg-transparent cursor-default' : 
                                'bg-gray-300 text-black'
                            }`}
                            disabled={number === '...'}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        &gt;
                    </button>
                </div>
            );
        }
        return null;
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSubmittedSearchTerm(searchTerm);
        onPageChange(1); // Reset page to 1 when searching
        if (typeof fetchEmployeeTypes === 'function') {
            fetchEmployeeTypes(1);
        }
    };

    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    };

    const filteredEmployeeTypes = employeeTypes.filter((type) =>
        removeVietnameseTones(type.nameEmployeeType).toLowerCase().includes(removeVietnameseTones(submittedSearchTerm).toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-3xl mb-6 text-center font-bold">Quản lý loại nhân viên</h1>
            <div className="mb-4 flex justify-end items-center space-x-2">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center ml-auto">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm loại nhân viên..."
                        className="p-2 border rounded w-80 pr-10"
                    />
                    <button type="submit" className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center">
                        <FaSearch className="text-gray-500" />
                    </button>
                </form>
                <button
                    onClick={() => navigate('/dashboard/employees/type/add')}
                    className="bg-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center fixed right-4 bottom-4"
                >
                    <div className="flex items-center justify-center w-full h-full">
                        <FaPlus className="text-3xl" />
                    </div>
                </button>
            </div>
            <table className="table-auto w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-center">
                        <th className="px-6 py-4 border">Loại nhân viên</th>
                        <th className="px-6 py-4 border">Quản lý</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="2" className="text-center py-4">Đang tải...</td>
                        </tr>
                    ) : (
                        filteredEmployeeTypes.length > 0 ? (
                            filteredEmployeeTypes.map((type) => (
                                <tr key={type.id} className="text-center">
                                    <td className="px-6 py-4 border">{type.nameEmployeeType}</td>
                                    <td className="px-6 py-4 border">
                                        <button
                                            onClick={() => navigate('/dashboard/employees/type/edit', { state: { initialData: type } })}
                                            className="bg-blue-500 text-white px-3 py-2 rounded mr-2"
                                        >
                                            <FaEdit />
                                        </button>
                                        <span className="mx-2">|</span>
                                        <button
                                            onClick={async () => {
                                                if (window.confirm("Bạn chắc chắn xóa chứ?")) {
                                                    await onDelete(type.id);
                                                    onPageChange(currentPage); // Re-fetch the updated data by calling onPageChange
                                                }
                                            }}
                                            className="bg-red-500 text-white px-3 py-2 rounded"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center py-4">
                                    Không có loại nhân viên nào.
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
            {totalPages > 0 && renderPagination()}
        </div>
    );
};

export default EmployeeTypeTable;