// CustomerTable.jsx
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CustomerTable = ({ customers, onEdit, onDelete }) => {
    return (
        <table className="table-auto w-full border border-gray-300">
            <thead>
                <tr className="bg-gray-200 text-center">
                    <th className="px-6 py-4 border">Tên đăng nhập</th>
                    <th className="px-6 py-4 border">Thông tin khách hàng</th>
                    <th className="px-6 py-4 border">Quản lý</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => (
                    <tr key={customer.id} className="text-center">
                        <td className="px-6 py-4 border">{customer.username}</td>
                        <td className="px-6 py-4 border">{customer.info}</td>
                        <td className="px-6 py-4 border">
                            <button onClick={() => onEdit(customer)} className="mr-2 text-blue-500">
                                <FaEdit />
                            </button>
                            <button onClick={() => onDelete(customer.id)} className="text-red-500">
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerTable;
