import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';

const AddPaymentMethodPage = () => {
    const navigate = useNavigate();

    const [methodName, setMethodName] = useState('');
    const [roles, setRoles] = useState([]);
    const [availableRoles, setAvailableRoles] = useState([]);

    // Lấy danh sách roles từ API
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Chưa đăng nhập!',
                        text: 'Vui lòng đăng nhập để tiếp tục.',
                    }).then(() => {
                        navigate('/login'); // Chuyển hướng về trang đăng nhập
                    });
                    return;
                }

                const response = await axios.get('http://localhost:8080/api/accounts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const accounts = response.data.result.contents;
                const extractedRoles = accounts.flatMap((account) => account.roles);
                const uniqueRoles = [...new Set(extractedRoles)];

                setAvailableRoles(uniqueRoles);
            } catch (err) {
                console.error('Lỗi khi tải roles:', err);
                if (err.response?.status === 401) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Hết phiên đăng nhập!',
                        text: 'Vui lòng đăng nhập lại.',
                    }).then(() => {
                        navigate('/login'); // Chuyển hướng về trang đăng nhập
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi!',
                        text: 'Không thể tải danh sách roles. Vui lòng thử lại.',
                    });
                }
            }
        };

        fetchRoles();
    }, []);
    const refreshToken = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/refresh-token', {
                token: localStorage.getItem('refreshToken'),
            });
            localStorage.setItem('token', response.data.token);
            return response.data.token;
        } catch (err) {
            console.error('Lỗi khi làm mới token:', err);
            navigate('/login');
        }
    };

    const handleCheckboxChange = (role) => {
        setRoles((prevRoles) =>
            prevRoles.includes(role)
                ? prevRoles.filter((r) => r !== role)
                : [...prevRoles, role]
        );
    };
    const handleCancel = () => {
        navigate('/dashboard/paymentmethod/list');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Chưa đăng nhập!',
                text: 'Vui lòng đăng nhập để tiếp tục.',
            }).then(() => {
                navigate('/login');
            });
            return;
        }

        const data = {
            methodName,
            roles,
        };

        try {
            await axios.post('http://localhost:8080/api/paymentMethods', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Phương thức thanh toán đã được thêm mới.',
            }).then(() => {
                navigate('/dashboard/paymentmethod/list');
            });
        } catch (err) {
            console.error('Lỗi khi thêm phương thức thanh toán:', err);
            if (err.response?.status === 401) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Hết phiên đăng nhập!',
                    text: 'Vui lòng đăng nhập lại.',
                }).then(() => {
                    navigate('/login');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: 'Không thể thêm phương thức thanh toán. Vui lòng thử lại.',
                });
            }
        }
    };


    return (
        <DefaultComponent title="Thêm phương thức thanh toán">
            <div className="container mx-auto p-6 bg-white shadow rounded">

                <form onSubmit={handleSubmit}>
                    {/* Nhập tên phương thức */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Tên phương thức</label>
                        <input
                            type="text"
                            value={methodName}
                            onChange={(e) => setMethodName(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Nhập tên phương thức"
                            required
                        />
                    </div>

                    {/* Chọn vai trò */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Vai trò</label>
                        <div className="flex flex-wrap gap-2">
                            {availableRoles.map((role, index) => (
                                <label key={index} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value={role}
                                        checked={roles.includes(role)}
                                        onChange={() => handleCheckboxChange(role)}
                                        className="form-checkbox"
                                    />
                                    <span>{role}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Nút hành động */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="bg-gray-300 text-black px-4 py-2 rounded"
                            onClick={handleCancel}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </DefaultComponent>
    );
};

export default AddPaymentMethodPage;    