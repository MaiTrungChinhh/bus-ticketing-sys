import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVehicles } from '../../../../services/vehicleService';


const VehicleInactive = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const fetchedVehicles = await fetchVehicles(); // Gọi API lấy danh sách tất cả các xe
                const inactiveVehicles = fetchedVehicles.filter(
                    (vehicle) => vehicle.status === 'OUT_OF_SERVICE' // Lọc xe `OUT_OF_SERVICE`
                );
                setVehicles(inactiveVehicles); // Lưu danh sách xe đã lọc vào state
            } catch (err) {
                console.error('Error fetching vehicles:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải danh sách xe. Vui lòng kiểm tra lại kết nối.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, []);


    const handleEdit = (vehicle) => {
        navigate('/dashboard/vehiclesinactive/edit', { state: { vehicle } });
    };

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    return (
        <div className="relative">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <table className="table-auto w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-center">
                        <th className="px-6 py-4 border">STT</th>
                        <th className="px-6 py-4 border">Tên xe</th>
                        <th className="px-6 py-4 border">Biển số xe</th>
                        <th className="px-6 py-4 border">Loại xe</th>
                        <th className="px-6 py-4 border">Số ghế</th>
                        <th className="px-6 py-4 border">Màu xe</th>
                        <th className="px-6 py-4 border">Ngày tạo</th>
                        <th className="px-6 py-4 border">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle, index) => (
                            <tr key={vehicle.id} className="text-center">
                                <td className="px-6 py-4 border">{index + 1}</td>
                                <td className="px-6 py-4 border">{vehicle.vehicleName}</td>
                                <td className="px-6 py-4 border">{vehicle.licensePlate}</td>
                                <td className="px-6 py-4 border">{vehicle.vehicleType?.vehicleTypeName || 'N/A'}</td>
                                <td className="px-6 py-4 border">{vehicle.seatCount}</td>
                                <td className="px-6 py-4 border">{vehicle.color || 'N/A'}</td>
                                <td className="px-6 py-4 border">
                                    {new Date(vehicle.createdAt).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-6 py-4 border">{vehicle.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center py-4">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleInactive;
