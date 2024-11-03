import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import EmployeeForm from '../../../components/Admin/Modules/StaffManagement/EmployeeForm';

const EditEmployeePage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [account, setAccount] = useState(location.state?.account || null);
    const [loading, setLoading] = useState(!account);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!account) {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Token không tồn tại hoặc đã hết hạn');
                setLoading(false);
                return;
            }

            axios.get(`http://localhost:8080/api/accounts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    console.log("Dữ liệu từ API:", response.data);
                    if (response.data && response.data.username) {
                        setAccount(response.data);
                    } else {
                        setError('Dữ liệu không hợp lệ. Không tìm thấy thông tin tài khoản.');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Lỗi khi lấy thông tin tài khoản:', error);
                    setError('Không thể tải thông tin tài khoản');
                    setLoading(false);
                });
        }
    }, [id, account]);

    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <DefaultComponent>
            <div>
                {account ? (
                    <EmployeeForm
                        initialData={account}
                        onSubmit={() => navigate('/dashboard/employees/list')}
                        onCancel={() => navigate('/dashboard/employees/list')}
                    />
                ) : (
                    <p>Không tìm thấy thông tin tài khoản</p>
                )}
            </div>
        </DefaultComponent>
    );
};

export default EditEmployeePage;
