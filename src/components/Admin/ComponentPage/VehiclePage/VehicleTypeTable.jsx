import React from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const VehicleTypeTable = ({ vehicleTypes, onDelete }) => {
    const navigate = useNavigate();

    return (
        <table className="table-auto w-full border border-gray-300">
            <thead>
                <tr className="bg-gray-200 text-center">
                    <th className="px-6 py-4 border">Tên loại xe</th>
                    <th className="px-6 py-4 border">Quản lý</th>
                </tr>
            </thead>
            <tbody>
                {vehicleTypes.length > 0 ? (
                    vehicleTypes.map((type) => {
                        console.log('Render loại xe:', type); // Kiểm tra dữ liệu
                        return (
                            <tr key={type.id} className="text-center">
                                <td className="px-6 py-4 border">{type.vehicleTypeName}</td>
                                <td className="px-6 py-4 border">
                                    <button
                                        onClick={() => navigate('/dashboard/vehicle/type/add')}
                                        className="bg-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center fixed right-4 bottom-4"
                                    >
                                        <div className="flex items-center justify-center w-full h-full">
                                            <FaPlus className="text-3xl" />
                                        </div>
                                    </button>
                                    <button
                                        onClick={() =>
                                            navigate('/dashboard/vehicletype/edit', {
                                                state: { initialData: type },
                                            })
                                        }
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        <FaEdit />
                                    </button>
                                    <span> | </span>
                                    <button
                                        onClick={() => onDelete(type.id)} // Gọi trực tiếp hàm onDelete
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="2" className="text-center py-4">
                            Không có loại xe nào.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default VehicleTypeTable;
