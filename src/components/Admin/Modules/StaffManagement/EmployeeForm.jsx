import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = ({ initialData, onSubmit, onCancel }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [roles, setRoles] = useState(['GUEST']);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (initialData) {
            setUsername(initialData.username || '');
            setRoles(initialData.roles || ['GUEST']);
        }
    }, [initialData]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("Token không tồn tại hoặc đã hết hạn");
            setMessage('Token không tồn tại hoặc đã hết hạn');
            return;
        }

        const url = `http://localhost:8080/api/accounts/${initialData.id}`;
        const requestData = { roles };

        axios.patch(url, requestData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setMessage('Lưu thành công');
                onSubmit(); // Gọi onSubmit sau khi lưu thành công
            })
            .catch(error => {
                console.error('Lỗi khi lưu tài khoản:', error);
                if (error.response) {
                    console.error('Lỗi từ server:', error.response.data);
                    setMessage(`Lưu không thành công: ${error.response.data.message || 'Lỗi không xác định'}`);
                } else {
                    setMessage('Lưu không thành công');
                }
            });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
            <h2 className="text-2xl mb-4 font-bold text-center">Chỉnh sửa tài khoản</h2>
            <div className="mb-4">
                <label className="block mb-2">Tên tài khoản</label>
                <input
                    type="text"
                    value={username}
                    className="w-full p-2 border rounded"
                    required
                    disabled // Không cho phép thay đổi tên tài khoản khi chỉnh sửa
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Quyền</label>
                <select
                    value={roles[0]}
                    onChange={(e) => setRoles([e.target.value])}
                    className="w-full p-2 border rounded"
                >
                    <option value="GUEST">GUEST</option>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                </select>
            </div>
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Hủy
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
                    <FaEdit className="mr-2" /> Lưu
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;


