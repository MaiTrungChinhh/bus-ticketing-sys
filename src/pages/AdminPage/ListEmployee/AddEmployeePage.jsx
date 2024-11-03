// New Component: AddEmployeePage.js
import axios from 'axios';
import React, { useState } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';

const AddEmployeePage = () => {
    const [username, setUsername] = useState('');
    const [roles, setRoles] = useState(['EMPLOYEE']);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("Token không tồn tại hoặc đã hết hạn");
            setMessage('Token không tồn tại hoặc đã hết hạn');
            return;
        }

        const url = 'http://localhost:8080/api/accounts';
        const method = 'post';

        const requestData = { username, roles, password };

        axios({
            method,
            url,
            data: requestData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setMessage('Lưu thành công');
                window.location.href = '/dashboard/employees/list'; // Redirect to the list user page after adding a new user
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

    const handleCancel = () => {
        window.location.href = '/dashboard/employees/list'; // Redirect to the list user page when canceling
    };

    return (
        <DefaultComponent title="Add Employee">
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
                <h2 className="text-2xl mb-4">Thêm nhân viên</h2>
                <div className="mb-4">
                    <label className="block mb-2">Tên tài khoản</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Quyền</label>
                    <select
                        value={roles[0]}
                        onChange={(e) => setRoles([e.target.value])}
                        className="w-full p-2 border rounded"
                    >
                        <option value="EMPLOYEE">EMPLOYEE</option>
                        <option value="GUEST">GUEST</option>
                    </select>
                </div>
                {message && <p className="text-red-500 mb-4">{message}</p>}
                <div className="flex justify-end">
                    <button type="button" onClick={handleCancel} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
                        Hủy
                    </button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Lưu
                    </button>
                </div>
            </form>
        </DefaultComponent>
    );
};

export default AddEmployeePage;