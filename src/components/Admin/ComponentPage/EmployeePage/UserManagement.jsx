import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const BASE_URL = 'http://localhost:8080/api/accounts';

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/token', {
                username: 'admin',
                password: 'admin'
            });
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
            } else {
                console.error('Token không tồn tại hoặc undefined.');
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
        }
    };

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token không tồn tại hoặc đã hết hạn.');
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const currentUsername = decodedToken.sub;

            const responseUsers = await axios.get(BASE_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { page: 1, pageSize: 10, sort: 'username' }
            });

            if (responseUsers.data.result && responseUsers.data.result.contents) {
                const filteredUsers = responseUsers.data.result.contents.filter(user => user.username !== currentUsername);
                setUsers(filteredUsers);
            } else {
                console.error('Dữ liệu không hợp lệ:', responseUsers.data);
            }

        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
            if (error.response && error.response.status === 401) {
                console.error("Token không hợp lệ hoặc hết hạn.");
            }
        }
    };

    useEffect(() => {
        login().then(() => {
            const token = localStorage.getItem('token');
            if (token) {
                fetchUsers();
            } else {
                console.error("Không tìm thấy token sau khi đăng nhập.");
            }
        });
    }, []);

    const handleFormSubmit = async (data) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token không tồn tại hoặc đã hết hạn.');
            return;
        }

        try {
            if (selectedUser) {
                await axios.put(`${BASE_URL}/${selectedUser.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                await axios.post(BASE_URL, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            setShowForm(false);
            setSelectedUser(null);
            fetchUsers();
        } catch (error) {
            console.error("Lỗi khi lưu tài khoản:", error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token không tồn tại hoặc đã hết hạn.');
            return;
        }

        try {
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchUsers();
        } catch (error) {
            console.error("Lỗi khi xóa tài khoản:", error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowForm(true);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl mb-6 text-center font-bold">Quản lý tài khoản</h1>
            <EmployeeTable accounts={users} onEdit={handleEdit} onDelete={handleDelete} />
            {showForm && (
                <EmployeeForm
                    initialData={selectedUser}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setSelectedUser(null);
                    }}
                />
            )}
        </div>
    );
};

export default UserManagement;
