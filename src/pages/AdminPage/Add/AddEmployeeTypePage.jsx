import axios from 'axios';
import React, { useState } from 'react';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';

const AddEmployeeTypePage = ({ initialData }) => {
    const [nameEmployeeType, setNameEmployeeType] = useState(initialData?.nameEmployeeType || '');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("Token không tồn tại hoặc đã hết hạn");
            setMessage('Token không tồn tại hoặc đã hết hạn');
            return;
        }

        const url = initialData ? `http://localhost:8080/api/employeeTypes/${initialData.id}` : 'http://localhost:8080/api/employeeTypes';
        const method = initialData ? 'put' : 'post';

        const requestData = { nameEmployeeType };

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
                window.location.href = '/dashboard/employees/type'; // Redirect to the employee type list page after adding/editing
            })
            .catch(error => {
                console.error('Lỗi khi lưu loại nhân viên:', error);
                if (error.response) {
                    console.error('Lỗi từ server:', error.response.data);
                    setMessage(`Lưu không thành công: ${error.response.data.message || 'Lỗi không xác định'}`);
                } else {
                    setMessage('Lưu không thành công');
                }
            });
    };

    const handleCancel = () => {
        window.location.href = '/dashboard/employees/type'; // Redirect to the employee type list page when canceling
    };

    return (
        <DefaultComponent>
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
                <h2 className="text-2xl mb-4">{initialData ? 'Chỉnh sửa loại nhân viên' : 'Thêm loại nhân viên'}</h2>
                <div className="mb-4">
                    <label className="block mb-2">Loại nhân viên</label>
                    <input
                        type="text"
                        value={nameEmployeeType}
                        onChange={(e) => setNameEmployeeType(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
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

export default AddEmployeeTypePage;
