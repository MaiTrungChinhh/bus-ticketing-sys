import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../../../components/Admin/ComponentPage/EmployeePage/EmployeeForm';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import employeeService from '../../../services/employeeService';

const EditEmployeePage = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Điều hướng trang
    const [employee, setEmployee] = useState(null); // Dữ liệu nhân viên
    const [employeeTypes, setEmployeeTypes] = useState([]); // Loại nhân viên
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(''); // Lỗi tải dữ liệu

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [employeeData, employeeTypeData] = await Promise.all([
                    employeeService.fetchEmployeesById(id), // Gọi API lấy nhân viên theo ID
                    employeeService.fetchEmployeeTypes(), // Gọi API lấy loại nhân viên
                ]);

                // Kiểm tra nếu username là admin
                if (employeeData?.account?.username === 'admin') {
                    alert('Bạn không thể chỉnh sửa tài khoản admin!');
                    navigate('/dashboard/employees/list'); // Điều hướng về danh sách
                    return; // Dừng xử lý nếu username là admin
                }

                // Ánh xạ dữ liệu nhân viên trả về đúng định dạng
                if (employeeData) {
                    setEmployee({
                        employeeName: employeeData.employeeName || '',
                        gender: employeeData.gender || '',
                        address: employeeData.address || '',
                        phone: employeeData.phone || '',
                        email: employeeData.email || '',
                        dob: employeeData.dob || '',
                        nationalIDNumber: employeeData.nationalIDNumber || '',
                        status: employeeData.status || '',
                        employeeTypeId: employeeData.employeeTypeId || '',
                        accountId: employeeData.accountId || '',
                    });
                }

                // Thiết lập danh sách loại nhân viên
                setEmployeeTypes(employeeTypeData.contents || []);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);

                if (error.response?.status === 404) {
                    setError('Không tìm thấy nhân viên. Vui lòng kiểm tra ID.');
                } else if (error.response?.data?.message) {
                    setError(`Lỗi từ server: ${error.response.data.message}`);
                } else {
                    setError('Lỗi không xác định khi tải dữ liệu.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleFormSubmit = async (data) => {
        try {
            await employeeService.updateEmployee(id, data); // Gọi API cập nhật nhân viên
            alert('Cập nhật nhân viên thành công.');
            navigate('/dashboard/employees/list');
        } catch (error) {
            console.error('Lỗi khi cập nhật nhân viên:', error);
            alert(`Không thể cập nhật nhân viên: ${error.response?.data?.message || 'Lỗi không xác định'}`);
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500 text-xl">Đang tải dữ liệu...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 text-xl">{error}</p>;
    }

    return (
        <DefaultComponent>
            <EmployeeForm
                initialData={employee} // Truyền dữ liệu nhân viên
                employeeTypes={employeeTypes} // Truyền danh sách loại nhân viên
                onSubmit={handleFormSubmit} // Gọi khi submit form
                onCancel={() => navigate('/dashboard/employees/list')} // Điều hướng về danh sách
            />
        </DefaultComponent>
    );
};

export default EditEmployeePage;
