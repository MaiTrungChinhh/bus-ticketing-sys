import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import priceService from '../../../../services/priceService';

const PriceTable = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const fetchedPrices = await priceService.fetchPrices();
                setPrices(fetchedPrices);
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu giá:', err);
                setError('Không thể tải dữ liệu. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    const handleDelete = async (priceId) => {
        const confirmDelete = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Dữ liệu giá vé này sẽ bị xoá!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xoá',
            cancelButtonText: 'Hủy',
        });

        if (confirmDelete.isConfirmed) {
            try {
                await priceService.deletePrice(priceId);
                setPrices((prev) => prev.filter((price) => price.id !== priceId));
                Swal.fire('Đã xoá!', 'Dữ liệu giá vé đã được xoá.', 'success');
            } catch (err) {
                console.error('Lỗi khi xoá giá vé:', err);
                Swal.fire('Lỗi', 'Không thể xoá giá vé. Vui lòng thử lại.', 'error');
            }
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Bảng Giá Vé</h1>
            <table className="table-auto w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-center">
                        <th className="px-6 py-4 border">STT</th>
                        <th className="px-6 py-4 border">Tuyến Đường</th>
                        <th className="px-6 py-4 border">Loại Xe</th>
                        <th className="px-6 py-4 border">Giá Vé</th>
                        <th className="px-6 py-4 border">Quản Lý</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.length > 0 ? (
                        prices.map((price, index) => (
                            <tr key={price.id} className="text-center">
                                <td className="px-6 py-4 border">{index + 1}</td>
                                <td className="px-6 py-4 border">
                                    {price.route.departureLocation} → {price.route.arrivalLocation}
                                </td>
                                <td className="px-6 py-4 border">{price.vehicleType.vehicleTypeName}</td>
                                <td className="px-6 py-4 border">
                                    {price.ticketPrice.toLocaleString('vi-VN')} VND
                                </td>
                                <td className="px-6 py-4 border flex justify-center items-center space-x-2">
                                    <button
                                        onClick={() => navigate('/dashboard/price/edit', { state: { price } })}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        <FaEdit />
                                    </button>

                                    <span> | </span>
                                    <button
                                        onClick={() => handleDelete(price.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-4">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button
                onClick={() => navigate('/dashboard/price/add')}
                className="bg-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center fixed right-4 bottom-4 shadow-lg"
            >
                <FaPlus className="text-3xl" />
            </button>
        </div>
    );
};

export default PriceTable;
