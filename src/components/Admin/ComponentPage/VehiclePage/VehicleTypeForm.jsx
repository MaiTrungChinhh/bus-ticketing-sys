import { useEffect, useState } from 'react';

const VehicleTypeForm = ({ onSubmit, initialData }) => {
    const [vehicleTypeName, setVehicleTypeName] = useState(initialData?.vehicleTypeName || '');

    useEffect(() => {
        setVehicleTypeName(initialData?.vehicleTypeName || '');
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ vehicleTypeName });
        setVehicleTypeName('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
                <label htmlFor="vehicleTypeName" className="block font-bold mb-2">
                    Tên loại xe:
                </label>
                <input
                    id="vehicleTypeName"
                    type="text"
                    value={vehicleTypeName}
                    onChange={(e) => setVehicleTypeName(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {initialData ? 'Cập nhật' : 'Thêm mới'}
            </button>
        </form>
    );
};
export default VehicleTypeForm;
