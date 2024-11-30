import React from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RouteTable = ({ routes, loading, onEdit, onDelete, onAdd }) => {
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-end items-center space-x-2">
                <button
                    onClick={() => navigate('/dashboard/route/add')}
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
                        <th className="px-6 py-4 border">Điểm khởi hành</th>
                        <th className="px-6 py-4 border">Điểm đến</th>
                        <th className="px-6 py-4 border">Điểm xuất phát</th>
                        <th className="px-6 py-4 border">Điểm đến cuối</th>
                        <th className="px-6 py-4 border">Khoảng cách (km)</th>
                        <th className="px-6 py-4 border">Thời gian (giờ)</th>
                        <th className="px-6 py-4 border">Quản lý</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="7" className="text-center py-4">Đang tải...</td>
                        </tr>
                    ) : routes.length > 0 ? (
                        routes.map((route) => (
                            <tr key={route.id} className="text-center">
                                <td className="px-6 py-4 border">{route.departureLocation}</td>
                                <td className="px-6 py-4 border">{route.arrivalLocation}</td>
                                <td className="px-6 py-4 border">{route.departurePoint}</td>
                                <td className="px-6 py-4 border">{route.arrivalPoint}</td>
                                <td className="px-6 py-4 border">{route.distance}</td>
                                <td className="px-6 py-4 border">{route.duration}</td>
                                <td className="px-6 py-4 border">
                                    <button
                                        onClick={() => navigate(`/dashboard/route/edit/${route.id}`)}
                                        className="bg-blue-500 text-white px-3 py-2 rounded mr-2"
                                    >
                                        <FaEdit />
                                    </button>
                                    <span className="mx-2">|</span>
                                    <button
                                        onClick={() => onDelete(route)}
                                        className="bg-red-500 text-white px-3 py-2 rounded"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-4">Không có tuyến đường nào.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RouteTable;
