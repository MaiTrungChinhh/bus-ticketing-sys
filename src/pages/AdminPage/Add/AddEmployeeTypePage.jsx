import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import employeeService from '../../../services/employeeService';

const AddEmployeeTypePage = ({ initialData }) => {
    const [nameEmployeeType, setNameEmployeeType] = useState(initialData?.nameEmployeeType || '');
    const navigate = useNavigate();

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
            if (initialData) {
                await employeeService.updateEmployeeType(initialData.id, { nameEmployeeType });
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Loại nhân viên đã được cập nhật.',
                });
            } else {
                await employeeService.addEmployeeType({ nameEmployeeType });
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Loại nhân viên mới đã được thêm.',
                });
            }

            navigate('/dashboard/employees/type'); // Redirect to employee type list page
        } catch (error) {
            console.error('Lỗi khi lưu loại nhân viên:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: error.response?.data?.message || 'Không thể lưu loại nhân viên. Vui lòng thử lại.',
            });
        }
    };

    const handleCancel = () => {
        navigate('/dashboard/employees/type'); // Redirect to employee type list page
    };

    return (
        <DefaultComponent>
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
                <h2 className="text-2xl mb-4">{initialData ? 'Chỉnh sửa loại nhân viên' : 'Thêm loại nhân viên'}</h2>
                <div className="mb-4">
                    <label className="block mb-2">Loại nhân viên</label>
                    <input
                        type="text"
                        value={nameEmployeeType}
                        onChange={(e) => setNameEmployeeType(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Nhập loại nhân viên"
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

export default AddEmployeeTypePage;
