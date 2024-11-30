import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import RouteForm from '../../../components/Admin/ComponentPage/RoutePage/RouteForm';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import routeService from '../../../services/routeService';

const EditRoutePage = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Điều hướng trang
    const [route, setRoute] = useState(null); // Dữ liệu tuyến đường
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(''); // Lỗi tải dữ liệu

    console.log('Route ID:', id);

    // Gọi API để lấy dữ liệu tuyến đường
    useEffect(() => {
        const fetchData = async () => {
            try {
                const routeData = await routeService.fetchRouteById(id);
                console.log('Route Data from API:', routeData);

                if (routeData && routeData.result) {
                    setRoute({
                        id: id,
                        departureLocation: routeData.result.departureLocation || '',
                        arrivalLocation: routeData.result.arrivalLocation || '',
                        departurePoint: routeData.result.departurePoint || '',
                        arrivalPoint: routeData.result.arrivalPoint || '',
                        distance: routeData.result.distance || '',
                        duration: routeData.result.duration || '',
                    });
                } else {
                    console.error('Route data is invalid:', routeData);
                    setError('Không tìm thấy tuyến đường. Vui lòng kiểm tra ID.');
                }
            } catch (error) {
                console.error('Error fetching route:', error);
                setError('Không tìm thấy tuyến đường. Vui lòng kiểm tra ID.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);



    // Xử lý gửi form
    const handleFormSubmit = async (data) => {
        try {
            console.log('Submitted Data:', data);
            let response;

            if (Object.keys(data).length === 1) {
                // Chỉ cập nhật một trường, dùng PATCH
                response = await routeService.patchRoute(id, data);
            } else {
                // Cập nhật toàn bộ, dùng PUT
                response = await routeService.updateRoute(id, data);
            }

            console.log('Cập nhật thành công:', response);

            // Hiển thị thông báo thành công
            await Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Cập nhật tuyến đường thành công.',
                confirmButtonText: 'OK',
            });

            navigate('/dashboard/routes/list'); // Điều hướng về danh sách
        } catch (error) {
            console.error('Lỗi khi cập nhật tuyến đường:', error);

            // Hiển thị thông báo lỗi
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: error.response?.data?.message || 'Không thể cập nhật tuyến đường. Vui lòng thử lại.',
                confirmButtonText: 'Đóng',
            });
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500 text-xl">Đang tải dữ liệu...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 text-xl">{error}</p>;
    }

    return (
        <DefaultComponent title="Chỉnh sửa tuyến đường">
            <RouteForm
                initialData={route} // Truyền dữ liệu tuyến đường
                onSubmit={handleFormSubmit} // Gọi khi submit form
                onCancel={() => navigate('/dashboard/routes/list')} // Điều hướng về danh sách
            />
        </DefaultComponent>
    );
};

export default EditRoutePage;
