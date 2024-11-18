import React from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CustomerTable = ({ customers, onEdit, onDelete }) => {
    const navigate = useNavigate(); // Import useNavigate để sử dụng navigate

    return (
        <div className="relative">
            <table className="table-auto w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-center">
                        <th className="px-6 py-4 border">STT</th>
                        <th className="px-6 py-4 border">Tên Khách Hàng</th>
                        <th className="px-6 py-4 border">Giới Tính</th>
                        <th className="px-6 py-4 border">Địa Chỉ</th>
                        <th className="px-6 py-4 border">Số Điện Thoại</th>
                        <th className="px-6 py-4 border">Email</th>
                        <th className="px-6 py-4 border">Ngày Sinh</th>
                        <th className="px-6 py-4 border">Tên Đăng Nhập</th>
                        <th className="px-6 py-4 border">Vai trò</th>
                        <th className="px-6 py-4 border">Quản Lý</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers.map((customer, index) => (
                            <tr key={customer.id} className="text-center">
                                <td className="px-6 py-4 border">{index + 1}</td>
                                <td className="px-6 py-4 border">{customer.customerName}</td>
                                <td className="px-6 py-4 border">{customer.gender}</td>
                                <td className="px-6 py-4 border">{customer.address}</td>
                                <td className="px-6 py-4 border">{customer.phone}</td>
                                <td className="px-6 py-4 border">{customer.email}</td>
                                <td className="px-6 py-4 border">{customer.dob}</td>
                                <td className="px-6 py-4 border">{customer.account.username}</td> {/* Sửa thành customer.account.username */}
                                <td className="px-6 py-4 border">
                                    {customer.account.roles.join(', ')}
                                </td>
                                <td className="px-6 py-4 border flex justify-center items-center space-x-2">
                                    <button onClick={() => onEdit(customer)} className="text-blue-500">
                                        <FaEdit />
                                    </button>
                                    <span>|</span>
                                    <button onClick={() => onDelete(customer.id)} className="text-red-500">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center py-4">
                                Không có khách hàng nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Nút thêm khách hàng mới */}
            <button
                onClick={() => navigate('/dashboard/customer/add')}
                className="bg-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center fixed right-4 bottom-4"
            >
                <FaPlus className="text-3xl" />
            </button>
        </div>
    );
};

export default CustomerTable;