import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../../../components/Admin/ComponentPage/EmployeePage/EmployeeForm';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';

const EditEmployeePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token không tồn tại.');
                }

                // Gọi API lấy thông tin nhân viên và loại nhân viên
                const [employeeResponse, typesResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/api/employees/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost:8080/api/employeeTypes', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const employeeData = employeeResponse.data;

                // Gắn dữ liệu nhân viên và danh sách loại nhân viên
                setEmployee({
                    ...employeeData,
                    username: employeeData?.account?.username || 'Không có tên đăng nhập', // Lấy username
                    employeeTypeId: employeeData?.employeeType?.id || '', // Lấy loại nhân viên
                });

                setEmployeeTypes(typesResponse.data.result.contents || []);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
                setError('Không thể tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleFormSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại.');
            }

            await axios.put(`http://localhost:8080/api/employees/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert('Cập nhật nhân viên thành công.');
            navigate('/dashboard/employees/list');
        } catch (error) {
            console.error('Lỗi khi cập nhật nhân viên:', error);
            alert(`Không thể cập nhật nhân viên: ${error.response?.data?.message || 'Lỗi không xác định'}`);
        }
    };

    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <DefaultComponent>
            <EmployeeForm
                initialData={employee} // Truyền dữ liệu nhân viên
                employeeTypes={employeeTypes} // Truyền danh sách loại nhân viên
                onSubmit={handleFormSubmit}
                onCancel={() => navigate('/dashboard/employees/list')}
            />
        </DefaultComponent>
    );
};

export default EditEmployeePage;
