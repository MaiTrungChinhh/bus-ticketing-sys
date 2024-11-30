import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import priceService from '../../../services/priceService';

const AddPricePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        route: '',
        vehicleType: '',
        ticketPrice: '',
    });

    const [routes, setRoutes] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedRoutes = await priceService.fetchRoutes();
                const fetchedVehicleTypes = await priceService.fetchVehicleTypes();

                setRoutes(fetchedRoutes);
                setVehicleTypes(fetchedVehicleTypes);
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải dữ liệu. Vui lòng thử lại.',
                });
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.route || !formData.vehicleType || !formData.ticketPrice) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng điền đầy đủ thông tin.',
            });
            return;
        }

        try {
            const payload = {
                routeId: formData.route,
                vehicleTypeId: formData.vehicleType,
                ticketPrice: parseInt(formData.ticketPrice, 10),
            };

            await priceService.createPrice(payload);

            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Giá vé đã được thêm mới.',
            }).then(() => {
                navigate('/dashboard/prices/list');
            });
        } catch (err) {
            console.error('Lỗi khi thêm giá vé:', err);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không thể thêm giá vé. Vui lòng thử lại.',
            });
        }
    };

    return (
        <DefaultComponent>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Thêm Giá Vé Mới</h1>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
                    <div>
                        <label className="block font-semibold mb-2">Tuyến Đường</label>
                        <select
                            name="route"
                            value={formData.route}
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
                        <label className="block font-semibold mb-2">Giá Vé</label>
                        <input
                            type="number"
                            name="ticketPrice"
                            value={formData.ticketPrice}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/prices/list')}
                            className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </DefaultComponent>
    );
};

export default AddPricePage;