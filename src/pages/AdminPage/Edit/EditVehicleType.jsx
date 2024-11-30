import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import { updateVehicleType } from '../../../services/vehicleService';


const EditVehicleType = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialData = location.state?.initialData;

    const [vehicleTypeName, setVehicleTypeName] = useState(initialData?.vehicleTypeName || '');

    useEffect(() => {
        if (!initialData) {
            Swal.fire({
                icon: 'error',
                title: 'Không tìm thấy dữ liệu!',
                text: 'Đang chuyển hướng...',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate('/dashboard/vehicles/type', { replace: true });
        }
    }, [initialData, navigate]);

    const handleCancel = () => navigate('/dashboard/vehicles/type');

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
            await updateVehicleType(initialData.id, { vehicleTypeName });
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Loại xe đã được cập nhật.',
            }).then(() => navigate('/dashboard/vehicles/type'));
        } catch (error) {
            console.error('Error updating vehicle type:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không thể cập nhật loại xe. Vui lòng thử lại.',
            });
        }
    };

    return (
        <DefaultComponent title="Chỉnh sửa loại xe">
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
                <h2 className="text-2xl mb-4">Chỉnh sửa loại xe</h2>
                <div className="mb-4">
                    <label className="block mb-2">Tên loại xe</label>
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
                        Cập nhật
                    </button>
                </div>
            </form>
        </DefaultComponent>
    );
};

export default EditVehicleType;
