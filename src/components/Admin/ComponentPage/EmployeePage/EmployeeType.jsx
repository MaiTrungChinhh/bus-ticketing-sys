// EmployeeType.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EmployeeTypeForm from './EmployeeTypeForm';
import EmployeeTypeTable from './EmployeeTypeTable';

export default function EmployeeType() {
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const BASE_URL = 'http://localhost:8080/api/employeeTypes';

    // Login to get the token
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

    // Fetch employee types with the token
    const fetchEmployeeTypes = async (page = 1) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token không tồn tại hoặc đã hết hạn.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}?page=${page}&pageSize=3`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data && response.data.result && Array.isArray(response.data.result.contents)) {
                setEmployeeTypes(response.data.result.contents);
                setTotalPages(response.data.result.totalPages);
            } else {
                setEmployeeTypes([]); // Ensure an empty array if response is invalid
                console.error('Dữ liệu không hợp lệ:', response.data);
            }
        } catch (error) {
            console.error('Error fetching employee types:', error);
            setEmployeeTypes([]); // Ensure employeeTypes is an empty array in case of an error
            if (error.response && error.response.status === 401) {
                console.error('Token không hợp lệ hoặc hết hạn.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Login and fetch employee types
        const initiateFetch = async () => {
            await login();
            const token = localStorage.getItem('token');
            if (token) {
                fetchEmployeeTypes(currentPage);
            } else {
                console.error('Không tìm thấy token sau khi đăng nhập.');
            }
        };
        initiateFetch();
    }, [currentPage]);

    // Handle form submission
    const handleFormSubmit = async (data) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token không tồn tại hoặc đã hết hạn.');
            return;
        }

        try {
            if (selectedType) {
                // Update employee type
                await axios.put(`${BASE_URL}/${selectedType.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                // Create new employee type
                await axios.post(BASE_URL, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            setShowForm(false);
            setSelectedType(null);
            fetchEmployeeTypes(currentPage);
        } catch (error) {
            console.error('Lỗi khi lưu loại nhân viên:', error);
        }
    };

 // Handle delete employee type
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

        // Sau khi xóa, kiểm tra và điều chỉnh currentPage nếu cần
        if (employeeTypes.length === 1 && currentPage > 1) {
            setCurrentPage((prevPage) => {
                const newPage = prevPage - 1;
                fetchEmployeeTypes(newPage);
                return newPage;
            });
        } else {
            // Gọi lại để cập nhật employeeTypes cho trang hiện tại
            fetchEmployeeTypes(currentPage);
        }
    } catch (error) {
        console.error('Lỗi khi xóa loại nhân viên:', error);
    }
};
    const handleEdit = (type) => {
        setSelectedType(type);
        setShowForm(true);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4">
            <EmployeeTypeTable
                employeeTypes={employeeTypes}
                onEdit={handleEdit}
                onDelete={handleDelete}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                loading={loading}
            />
            {showForm && (
                <EmployeeTypeForm
                    initialData={selectedType}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setSelectedType(null);
                    }}
                />
            )}
        </div>
    );
}
