import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import paymentMethodService from '../../../services/paymentMethodService';

const AddPaymentMethodPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        methodName: '',
        roles: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.methodName || !formData.roles) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng điền đầy đủ thông tin.',
            });
            return;
        }

        try {
            const payload = {
                methodName: formData.methodName,
                roles: formData.roles.split(',').map((role) => role.trim()), // Chuyển roles thành mảng
            };

            await paymentMethodService.createPaymentMethod(payload);

            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Phương thức thanh toán đã được thêm mới.',
            }).then(() => {
                navigate('/dashboard/payment-methods/list');
            });
        } catch (err) {
            console.error('Lỗi khi thêm phương thức thanh toán:', err);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không thể thêm phương thức thanh toán. Vui lòng thử lại.',
            });
        }
    };

    return (
        <DefaultComponent>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Thêm Phương Thức Thanh Toán</h1>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
                    <div>
                        <label className="block font-semibold mb-2">Tên Phương Thức</label>
                        <input
                            type="text"
                            name="methodName"
                            value={formData.methodName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Roles</label>
                        <input
                            type="text"
                            name="roles"
                            value={formData.roles}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Nhập các roles cách nhau bằng dấu phẩy, ví dụ: ADMIN,USER"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/payment-methods/list')}
                            className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
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
