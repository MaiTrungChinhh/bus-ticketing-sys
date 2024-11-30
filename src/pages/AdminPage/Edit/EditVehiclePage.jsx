import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import { fetchVehicleTypes, updateVehicle } from '../../../services/vehicleService';



const EditVehiclePage = ({ setVehicles }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const vehicle = location.state?.vehicle;

    const [formData, setFormData] = useState({
        vehicleName: vehicle?.vehicleName || '',
        color: vehicle?.color || '',
        status: vehicle?.status || '',
        vehicleType: vehicle?.vehicleType?.id || '',
    });

    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!vehicle) {
            Swal.fire({
                icon: 'error',
                title: 'Không tìm thấy thông tin xe',
                text: 'Vui lòng thử lại.',
            }).then(() => navigate('/dashboard/vehicles/list'));
        }
    }, [vehicle, navigate]);

    useEffect(() => {
        const fetchVehicleType = async () => {
            try {
                const types = await fetchVehicleTypes();
                setVehicleTypes(types);
            } catch (err) {
                console.error('Lỗi khi tải danh sách loại xe:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải danh sách loại xe. Vui lòng thử lại.',
                });
            }
        };

        fetchVehicleType();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.vehicleName || !formData.vehicleType || !formData.status) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng điền đầy đủ thông tin trước khi cập nhật.',
            });
            return;
        }

        setLoading(true);

        try {
            const payload = {
                vehicleName: formData.vehicleName,
                color: formData.color,
                status: formData.status,
                vehicleType: formData.vehicleType,
            };

            await updateVehicle(vehicle.id, payload);

            if (setVehicles) {
                setVehicles((prev) =>
                    prev.map((v) => (v.id === vehicle.id ? { ...v, ...formData } : v))
                );
            }

            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Xe đã được cập nhật.',
            }).then(() => navigate('/dashboard/vehicles/list', { state: { reload: true } }));
        } catch (err) {
            console.error('Lỗi khi cập nhật xe:', err);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không thể cập nhật thông tin xe. Vui lòng thử lại.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DefaultComponent>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Chỉnh sửa xe</h1>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
                    <div>
                        <label className="block font-semibold mb-2">Tên xe</label>
                        <input
                            type="text"
                            name="vehicleName"
                            value={formData.vehicleName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Màu xe</label>
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Trạng thái</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="MAINTENANCE">MAINTENANCE</option>
                            <option value="OUT_OF_SERVICE">OUT OF SERVICE</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Loại xe</label>
                        <select
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Chọn loại xe</option>
                            {vehicleTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.vehicleTypeName || 'Không rõ tên loại xe'}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/vehicles/list')}
                            className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {loading ? 'Đang lưu...' : 'Lưu'}
                        </button>
                    </div>
                </form>
            </div>
        </DefaultComponent>
    );
};

export default EditVehiclePage;
