import React, { useEffect } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const VehicleTable = ({ vehicles, onEdit, onDelete }) => {
    const navigate = useNavigate(); // Import useNavigate để điều hướng
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const fetchedVehicles = await vehicleService.fetchVehicles();
                console.log('Fetched Vehicles:', fetchedVehicles); // Log dữ liệu
                setVehicles(fetchedVehicles);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles();
    }, []);

    return (
        <div className="relative">
            <table className="table-auto w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-center">
                        <th className="px-6 py-4 border">STT</th>
                        <th className="px-6 py-4 border">Tên xe</th>
                        <th className="px-6 py-4 border">Biển số xe</th>
                        <th className="px-6 py-4 border"> Loại xe</th>
                        <th className="px-6 py-4 border">Số ghế</th>
                        <th className="px-6 py-4 border">Màu xe</th>
                        <th className="px-6 py-4 border">Ngày tạo</th>
                        <th className="px-6 py-4 border">Trạng thái</th>
                        <th className="px-6 py-4 border">Quản lý</th>
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
                                <td className="px-6 py-4 border flex justify-center items-center space-x-2">
                                    <button
                                        onClick={() => navigate('/dashboard/vehicle/edit', { state: { vehicle } })}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        <FaEdit />
                                    </button>
                                    <span>|</span>
                                    <button
                                        onClick={() => onDelete(vehicle.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
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

            {/* Nút thêm xe mới */}
            <button
                onClick={() => navigate('/dashboard/vehicle/add')}
                className="bg-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center fixed right-4 bottom-4"
            >
                <FaPlus className="text-3xl" />

            </button>
        </div>
    );
};

export default VehicleTable;
