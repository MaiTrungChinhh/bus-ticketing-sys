import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../../../components/Admin/ComponentPage/EmployeePage/EmployeeForm';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';

const EditEmployeePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Token không tồn tại hoặc đã hết hạn');
                navigate('/login'); // Redirect to login if token is missing
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('Dữ liệu từ API:', response.data);

                if (response.data) {
                    setEmployee(response.data);
                } else {
                    setError('Không tìm thấy thông tin nhân viên');
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin nhân viên:', error);
                setError('Không thể tải thông tin nhân viên');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id, navigate]);

    const handleFormSubmit = async (data) => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Token không tồn tại hoặc đã hết hạn');
            navigate('/login');
            return;
        }

        try {
            console.log("Dữ liệu gửi lên:", data);

            await axios.put(`http://localhost:8080/api/employees/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log('Cập nhật nhân viên thành công');
            navigate('/dashboard/employees/list');
        } catch (error) {
            console.error('Lỗi khi cập nhật nhân viên:', error);
            alert('Không thể cập nhật nhân viên');
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
            <div>
                {employee ? (
                    <EmployeeForm
                        initialData={employee}
                        onSubmit={handleFormSubmit}
                        onCancel={() => navigate('/dashboard/employees/list')}
                    />
                ) : (
                    <p>Không tìm thấy thông tin nhân viên</p>
                )}
            </div>
        </DefaultComponent>
    );
};

export default EditEmployeePage;
