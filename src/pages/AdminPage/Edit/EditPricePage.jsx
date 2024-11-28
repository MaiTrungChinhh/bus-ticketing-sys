import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import priceService from '../../../services/priceService';

const EditPricePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const priceData = location.state?.price || null;

    const [formData, setFormData] = useState({
        route: priceData?.route?.id || '',
        vehicleType: priceData?.vehicleType?.id || '',
        ticketPrice: priceData?.ticketPrice || '',
    });

    const [routes, setRoutes] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedRoutes = await priceService.fetchRoutes();
                const fetchedVehicleTypes = await priceService.fetchVehicleTypes();

                // Nếu tuyến đường từ priceData không có trong danh sách, thêm vào
                if (priceData?.route && !fetchedRoutes.some((route) => route.id === priceData.route.id)) {
                    fetchedRoutes.push(priceData.route);
                }

                setRoutes(fetchedRoutes);
                setVehicleTypes(fetchedVehicleTypes);
                setIsLoading(false);
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải dữ liệu. Vui lòng thử lại.',
                });
                setIsLoading(false);
            }
        };

        fetchData();
    }, [priceData]);

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

            await priceService.updatePrice(priceData.id, payload);

            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Giá vé đã được cập nhật.',
            }).then(() => navigate('/dashboard/prices/list'));
        } catch (err) {
            console.error('Lỗi khi cập nhật giá vé:', err);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không thể cập nhật giá vé. Vui lòng thử lại.',
            });
        }
    };

    if (isLoading) {
        return <div className="text-center">Đang tải dữ liệu...</div>;
    }

    return (
        <DefaultComponent title="Chỉnh Sửa Giá Vé">
            <div className="container mx-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
                    <h1 className="text-3xl font-bold mb-4 text-center">Chỉnh Sửa Giá Vé</h1>

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
                            type="submit"
                            className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Lưu
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/prices/list')}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </DefaultComponent>
    );
};

export default EditPricePage;
