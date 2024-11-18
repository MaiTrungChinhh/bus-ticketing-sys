import React from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EmployeeTypeTable = ({ onEdit, onDelete, employeeTypes, loading, onPageChange, currentPage }) => {
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-end items-center space-x-2">
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
                        employeeTypes.length > 0 ? (
                            employeeTypes.map((type) => (
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
                                                    if (typeof onPageChange === 'function') {
                                                        onPageChange(currentPage);
                                                    }
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
        </div>
    );
};

export default EmployeeTypeTable;
