// src/components/UserComponent.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';

const Employee = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const BASE_URL = 'http://localhost:8080/api/accounts';

    // Lấy token từ API và lưu vào localStorage
    const login = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/token', {
                username: 'admin',
                password: 'admin'
            });
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                console.log('Đăng nhập thành công, token:', token);
            } else {
                console.error('Token nhận được là null hoặc undefined.');
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
        }
    };

    // Lấy danh sách người dùng và loại bỏ tài khoản đang đăng nhập
    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token không tồn tại hoặc đã hết hạn.');
            return;
        }

        try {
            // Lấy thông tin tài khoản hiện tại từ token
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const currentUsername = decodedToken.sub;

            const responseUsers = await axios.get(BASE_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { page: 1, pageSize: 4, sort: 'username' }
            });

            // Kiểm tra và xử lý dữ liệu người dùng
            if (responseUsers.data.result && responseUsers.data.result.contents) {
                // Lọc danh sách để loại bỏ tài khoản đang đăng nhập
                const filteredUsers = responseUsers.data.result.contents.filter(user => user.username !== currentUsername);
                setUsers(filteredUsers);
            } else {
                console.error('Dữ liệu không đúng định dạng mong đợi:', responseUsers.data);
            }

        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
            if (error.response && error.response.status === 401) {
                console.error("Token không hợp lệ hoặc hết hạn.");
            }
        }
    };

    useEffect(() => {
        console.log("Employee được render");
        login().then(() => {
            const token = localStorage.getItem('token');
            if (token) {
                console.log('Token sau khi đăng nhập:', token);
                fetchUsers();
            } else {
                console.error("Không tìm thấy token sau khi đăng nhập.");
            }
        });
    }, []);

    // Thêm hoặc cập nhật người dùng
    const handleFormSubmit = async (data) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token không tồn tại hoặc đã hết hạn.');
            return;
        }

        try {
            if (selectedUser) {
                // Cập nhật người dùng
                await axios.put(`${BASE_URL}/${selectedUser.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                // Thêm mới người dùng
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

    // Xóa người dùng
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
            <h1 className="text-3xl mb-6 text-center font-bold">Danh sách tài khoản</h1>
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

export default Employee;
