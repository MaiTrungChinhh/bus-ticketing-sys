import React from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const PaymentMethodTable = ({ paymentMethods, onEdit, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => navigate('/dashboard/paymentmethod/add')}
                className="bg-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center fixed right-4 bottom-4 shadow-lg"
            >
                <FaPlus className="text-3xl" />
            </button>
            <table className="table-auto w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-center">
                        <th className="px-6 py-4 border">STT</th>
                        <th className="px-6 py-4 border">Tên phương thức</th>
                        <th className="px-6 py-4 border">Roles</th>
                        <th className="px-6 py-4 border">Quản lý</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentMethods.length > 0 ? (
                        paymentMethods.map((method, index) => (
                            <tr key={method.id} className="text-center">
                                <td className="px-6 py-4 border">{index + 1}</td>
                                <td className="px-6 py-4 border">{method.methodName}</td>
                                <td className="px-6 py-4 border">
                                    {method.roles && method.roles.length > 0
                                        ? method.roles.join(', ')
                                        : 'Không có roles'}
                                </td>
                                <td className="px-6 py-4 border flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => navigate(`/dashboard/paymentmethod/edit/${method.id}`)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => onDelete(method.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4 border">
                                Không có dữ liệu.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentMethodTable;
