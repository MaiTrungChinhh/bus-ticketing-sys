import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import employeeService from '../../../services/employeeService';

const EditEmployeeTypePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialData = location.state?.initialData;

    const [nameEmployeeType, setNameEmployeeType] = useState(initialData?.nameEmployeeType || '');

    useEffect(() => {
        if (!initialData) {
            Swal.fire({
                icon: 'error',
                title: 'Không tìm thấy dữ liệu!',
                text: 'Đang chuyển hướng...',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate('/dashboard/employees/type', { replace: true });
        }
    }, [initialData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nameEmployeeType.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Tên loại nhân viên không được để trống!',
            });
            return;
        }

        try {
            await employeeService.updateEmployeeType(initialData.id, { nameEmployeeType });
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Loại nhân viên đã được cập nhật.',
            }).then(() => navigate('/dashboard/employees/type'));
        } catch (error) {
            console.error('Lỗi khi cập nhật loại nhân viên:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: error.response?.data?.message || 'Không thể cập nhật loại nhân viên. Vui lòng thử lại.',
            });
        }
    };

    const handleCancel = () => {
        navigate('/dashboard/employees/type'); // Quay lại danh sách loại nhân viên
    };

    return (
        <DefaultComponent>
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
                <h2 className="text-2xl mb-4 text-center ">Chỉnh sửa loại nhân viên</h2>
                <div className="mb-4">
                    <label className="block mb-2">Tên loại nhân viên</label>
                    <input
                        type="text"
                        value={nameEmployeeType}
                        onChange={(e) => setNameEmployeeType(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Nhập tên loại nhân viên"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </DefaultComponent>
    );
};

export default EditEmployeeTypePage;
