import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import { addVehicle, fetchVehicleTypes } from '../../../services/vehicleService';

export default function AddVehiclePage() {
    const [formData, setFormData] = useState({
        vehicleName: '',
        licensePlate: '',
        color: '',
        vehicleType: '',
        seatCount: '',
    });

    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Lấy danh sách loại xe
    useEffect(() => {
        const fetchVehicleType = async () => {
            try {
                const types = await fetchVehicleTypes();
                setVehicleTypes(types);
            } catch (error) {
                console.error('Error fetching vehicle types:', error);
                setError('Không thể tải danh sách loại xe.');
            }
        };

        fetchVehicleType();
    }, []);

    // Xử lý khi nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'seatCount' ? parseInt(value, 10) || '' : value,
        }));
    };

    const handleCancel = () => {
        navigate('/dashboard/vehicles/list');
    };

    // Gửi request tạo vehicle
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { vehicleName, licensePlate, color, vehicleType, seatCount } = formData;

        if (!vehicleName || !licensePlate || !color || !vehicleType || !seatCount) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        setIsLoading(true);
        try {
            await addVehicle({ vehicleName, licensePlate, color, vehicleType, seatCount });

            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Vehicle đã được tạo thành công.',
            }).then(() => {
                navigate('/dashboard/vehicles/list');
            });
        } catch (error) {
            console.error('Error creating vehicle:', error);
            setError('Đã xảy ra lỗi khi tạo vehicle.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DefaultComponent title={'Thêm xe'}>
            <div className="container mx-auto p-6">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
                    <div>
                        <label htmlFor="vehicleName" className="block font-semibold mb-2">
                            Tên xe
                        </label>
                        <input
                            type="text"
                            id="vehicleName"
                            name="vehicleName"
                            value={formData.vehicleName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Nhập tên xe"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="licensePlate" className="block font-semibold mb-2">
                            Biển số xe
                        </label>
                        <input
                            type="text"
                            id="licensePlate"
                            name="licensePlate"
                            value={formData.licensePlate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Nhập biển số xe"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="color" className="block font-semibold mb-2">
                            Màu xe
                        </label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Nhập màu xe"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="vehicleType" className="block font-semibold mb-2">
                            Loại xe
                        </label>
                        <select
                            id="vehicleType"
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Chọn loại xe</option>
                            {vehicleTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.vehicleTypeName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="seatCount" className="block font-semibold mb-2">
                            Số ghế
                        </label>
                        <input
                            type="number"
                            id="seatCount"
                            name="seatCount"
                            value={formData.seatCount}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Nhập số ghế"
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
                            {isLoading ? 'Đang lưu...' : 'Lưu'}
                        </button>
                    </div>
                </form>
            </div>
        </DefaultComponent>
    );
}
