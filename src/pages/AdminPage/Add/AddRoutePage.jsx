import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import routeService from '../../../services/routeService';

const AddRoutePage = () => {
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [departurePoint, setDeparturePoint] = useState('');
    const [arrivalPoint, setArrivalPoint] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu trước khi gửi
        if (!departureLocation || !arrivalLocation || !departurePoint || !arrivalPoint || !distance || !duration) {
            setMessage('Vui lòng điền đầy đủ các trường thông tin.');
            return;
        }

        const routeData = {
            departureLocation,
            arrivalLocation,
            departurePoint,
            arrivalPoint,
            distance: parseFloat(distance),
            duration: parseInt(duration, 10),
        };

        try {
            // Gửi dữ liệu qua service
            await routeService.createRoute(routeData);
            setMessage('Tuyến đường đã được thêm thành công.');
            navigate('/dashboard/routes/list');
        } catch (error) {
            console.error('Lỗi khi tạo tuyến đường:', error);
            setMessage(`Lỗi: ${error.response?.data?.message || 'Không thể thêm tuyến đường.'}`);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard/routes/list');
    };
    const handleSave = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn lưu tuyến đường này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Lưu',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                handleSubmit(e); // Gọi hàm thực hiện lưu dữ liệu nếu người dùng xác nhận
            }
        });
    };

    return (
        <DefaultComponent title="Thêm tuyến đường">
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
                <h2 className="text-2xl mb-4">Thêm Tuyến Đường</h2>
                <div className="mb-4">
                    <label className="block mb-2">Nơi khởi hành</label>
                    <input
                        type="text"
                        value={departureLocation}
                        onChange={(e) => setDepartureLocation(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Nơi đến</label>
                    <input
                        type="text"
                        value={arrivalLocation}
                        onChange={(e) => setArrivalLocation(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Điểm khởi hành</label>
                    <input
                        type="text"
                        value={departurePoint}
                        onChange={(e) => setDeparturePoint(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Điểm đến</label>
                    <input
                        type="text"
                        value={arrivalPoint}
                        onChange={(e) => setArrivalPoint(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Khoảng cách (km)</label>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Thời gian (giờ)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                {message && <p className="text-red-500 mb-4">{message}</p>}
                <div className="flex justify-end">
                    <button type="button" onClick={handleCancel} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
                        Hủy
                    </button>
                    <button type="button" onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Lưu
                    </button>
                </div>
            </form>
        </DefaultComponent>
    );
};

export default AddRoutePage;
