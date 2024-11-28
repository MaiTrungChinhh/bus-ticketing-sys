import React, { useState } from 'react';

const PriceForm = ({ onSubmit, initialData = {}, routes = [], vehicleTypes = [] }) => {
    const [formData, setFormData] = useState({
        routeId: initialData.routeId || '',
        vehicleTypeId: initialData.vehicleTypeId || '',
        ticketPrice: initialData.ticketPrice || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.routeId || !formData.vehicleTypeId || !formData.ticketPrice) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        onSubmit(formData); // Truyền dữ liệu về component cha
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow-md">
            <div>
                <label className="block font-semibold mb-2">Tuyến Đường</label>
                <select
                    name="routeId"
                    value={formData.routeId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Chọn tuyến đường</option>
                    {routes.map((route) => (
                        <option key={route.id} value={route.id}>
                            {route.departureLocation} - {route.arrivalLocation}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block font-semibold mb-2">Loại Xe</label>
                <select
                    name="vehicleTypeId"
                    value={formData.vehicleTypeId}
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
                <label className="block font-semibold mb-2">Giá Vé</label>
                <input
                    type="number"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Nhập giá vé"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Lưu
                </button>
            </div>
        </form>
    );
};

export default PriceForm;
