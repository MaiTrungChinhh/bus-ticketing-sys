import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';

const EditPaymentMethodPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [methodName, setMethodName] = useState('');
    const [roles, setRoles] = useState([]);
    const [availableRoles, setAvailableRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/paymentMethods/${id}`);
                console.log('Dữ liệu phương thức:', response.data);
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu:', err);
            }
        };

        if (id) fetchData();
    }, [id]);
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Chưa đăng nhập!',
                    text: 'Vui lòng đăng nhập để tiếp tục.',
                }).then(() => navigate('/login'));
                return;
            }

            try {
                // Lấy thông tin phương thức thanh toán
                const paymentMethodResponse = await axios.get(`http://localhost:8080/api/paymentMethods/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const paymentMethod = paymentMethodResponse.data.result || {};
                setMethodName(paymentMethod.methodName || '');
                setRoles(paymentMethod.roles || []);

                // Lấy danh sách roles từ API accounts
                const accountsResponse = await axios.get('http://localhost:8080/api/accounts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const accounts = accountsResponse.data.result.contents || [];
                const extractedRoles = accounts.flatMap((account) => account.roles);
                const uniqueRoles = [...new Set(extractedRoles)];
                setAvailableRoles(uniqueRoles);
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu:', err.response || err);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: 'Không thể tải dữ liệu. Vui lòng thử lại.',
                }).then(() => navigate('/dashboard/paymentmethod/list'));
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id, navigate]);

    const handleCheckboxChange = (role) => {
        setRoles((prevRoles) =>
            prevRoles.includes(role)
                ? prevRoles.filter((r) => r !== role)
                : [...prevRoles, role]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const data = {
            methodName,
            roles,
        };

        try {
            await axios.put(`http://localhost:8080/api/paymentMethods/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Phương thức thanh toán đã được cập nhật.',
            }).then(() => {
                navigate('/dashboard/paymentmethod/list');
            });
        } catch (err) {
            console.error('Lỗi khi cập nhật phương thức thanh toán:', err.response || err);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Không thể cập nhật thông tin. Vui lòng thử lại.',
            });
        }
    };

    const handleCancel = () => {
        navigate('/dashboard/paymentmethod/list');
    };

    if (loading) return <p className="text-center py-4">Đang tải dữ liệu...</p>;

    return (
        <DefaultComponent title="Chỉnh sửa phương thức thanh toán">
            <div className="container mx-auto p-6 bg-white shadow rounded">
                <h1 className="text-2xl font-bold mb-6 text-center">Chỉnh Sửa Phương Thức Thanh Toán</h1>
                <form onSubmit={handleSubmit}>
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

export default EditPaymentMethodPage;
