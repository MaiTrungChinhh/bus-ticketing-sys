import React, { useEffect, useState } from 'react';

const RouteForm = ({ initialData = {}, onSubmit, onCancel }) => {
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [departurePoint, setDeparturePoint] = useState('');
    const [arrivalPoint, setArrivalPoint] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    // Đồng bộ dữ liệu với initialData khi nó thay đổi
    useEffect(() => {
        console.log('Initial Data in RouteForm:', initialData);
        if (initialData && Object.keys(initialData).length > 0) {
            setDepartureLocation(initialData.departureLocation || '');
            setArrivalLocation(initialData.arrivalLocation || '');
            setDeparturePoint(initialData.departurePoint || '');
            setArrivalPoint(initialData.arrivalPoint || '');
            setDistance(initialData.distance || '');
            setDuration(initialData.duration || '');
        }
    }, [initialData]);





    const handleSubmit = (e) => {
        e.preventDefault();
        if (!departureLocation || !arrivalLocation || !departurePoint || !arrivalPoint || !distance || !duration) {
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
            return;
        }
        onSubmit({
            departureLocation,
            arrivalLocation,
            departurePoint,
            arrivalPoint,
            distance: parseFloat(distance),
            duration: parseFloat(duration),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
            <h2 className="text-2xl mb-4">
                {initialData && initialData.id ? 'Chỉnh Sửa Tuyến Đường' : 'Thêm Tuyến Đường'}
            </h2>


            {/* Điểm khởi hành */}
            <div className="mb-4">
                <label className="block mb-2">Điểm khởi hành</label>
                <input
                    type="text"
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {/* Điểm đến */}
            <div className="mb-4">
                <label className="block mb-2">Điểm đến</label>
                <input
                    type="text"
                    value={arrivalLocation}
                    onChange={(e) => setArrivalLocation(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {/* Điểm xuất phát */}
            <div className="mb-4">
                <label className="block mb-2">Điểm xuất phát</label>
                <input
                    type="text"
                    value={departurePoint}
                    onChange={(e) => setDeparturePoint(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {/* Điểm đến cuối */}
            <div className="mb-4">
                <label className="block mb-2">Điểm đến cuối</label>
                <input
                    type="text"
                    value={arrivalPoint}
                    onChange={(e) => setArrivalPoint(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {/* Khoảng cách */}
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

            {/* Thời gian */}
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

            {/* Nút hành động */}
            <div className="flex justify-end">
                <button type="button" onClick={onCancel} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
                    Hủy
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Lưu
                </button>
            </div>
        </form>
    );
};

export default RouteForm;
