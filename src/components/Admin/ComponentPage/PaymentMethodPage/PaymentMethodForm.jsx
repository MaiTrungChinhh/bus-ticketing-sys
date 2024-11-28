import React, { useEffect, useState } from 'react';
import paymentMethodService from '../../../../services/paymentMethodService';

const PaymentMethodForm = ({ initialData = {}, onSubmit, onCancel }) => {
    const [methodName, setMethodName] = useState(initialData.methodName || '');
    const [roles, setRoles] = useState(initialData.roles || '');
    const [availableRoles, setAvailableRoles] = useState([]);

    // Fetch danh sách roles từ API
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await paymentMethodService.fetchPaymentMethods();
                console.log('Response từ API:', response); // Debug response

                const accounts = response?.result?.contents || [];
                console.log('Accounts:', accounts); // Debug accounts

                const extractedRoles = accounts.flatMap(account => account.roles || []);
                console.log('Danh sách roles:', extractedRoles); // Debug roles

                const uniqueRoles = [...new Set(extractedRoles)];
                setAvailableRoles(uniqueRoles);
            } catch (err) {
                console.error('Lỗi khi tải roles:', err);
            }
        };

        fetchRoles();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { methodName, roles };

        try {
            if (initialData.id) {
                // Update phương thức thanh toán
                await paymentMethodService.updatePaymentMethod(initialData.id, data);
            } else {
                // Tạo mới phương thức thanh toán
                await paymentMethodService.createPaymentMethod(data);
            }
            onSubmit(data); // Callback sau khi lưu thành công
        } catch (err) {
            console.error('Lỗi khi lưu phương thức thanh toán:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Tên phương thức</label>
                <input
                    type="text"
                    value={methodName}
                    onChange={(e) => setMethodName(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Roles</label>
                <select
                    value={roles}
                    onChange={(e) => setRoles(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Chọn vai trò</option>
                    {availableRoles.map((role, index) => (
                        <option key={index} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex gap-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Lưu
                </button>
                <button
                    type="button"
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                    onClick={onCancel}
                >
                    Hủy
                </button>
            </div>
        </form>
    );
};

export default PaymentMethodForm;
