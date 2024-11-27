import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import vehicleService from '../../../services/vehicleService';

export default function AddVehicleTypePage() {
    const [vehicleTypeName, setVehicleTypeName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!vehicleTypeName.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Tên loại xe không được để trống!',
            });
            return;
        }

        try {
            await vehicleService.addVehicleType(vehicleTypeName);

            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Loại xe mới đã được thêm.',
            }).then(() => {
                navigate('/dashboard/vehicles/type');
            });
        } catch (error) {
            console.error('Error adding vehicle type:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không thể thêm loại xe mới. Vui lòng thử lại.',
            });
        }
    };

    const handleCancel = () => {
        navigate('/dashboard/vehicles/type'); // Điều hướng quay lại danh sách
    };

    return (
        <DefaultComponent>
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
                <h2 className="text-2xl mb-4">Thêm Loại Xe</h2>
                <div className="mb-4">
                    <label className="block mb-2">Tên Loại Xe</label>
                    <input
                        type="text"
                        value={vehicleTypeName}
                        onChange={(e) => setVehicleTypeName(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Nhập tên loại xe"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </DefaultComponent>
    );
}
