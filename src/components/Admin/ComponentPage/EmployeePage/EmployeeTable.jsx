import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  const fetchEmployees = async (page) => {
    setLoading(true);
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token không tồn tại hoặc đã hết hạn.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/api/employees', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: page, pageSize: 10 },
      });

      console.log('Phản hồi từ API:', response.data);

      if (response.data.result && Array.isArray(response.data.result.contents)) {
        setEmployees(response.data.result.contents);
        setTotalPages(response.data.result.totalPages);
      } else {
        console.error('Dữ liệu không đúng định dạng:', response.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhân viên:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEdit = (employee) => {
    // Điều hướng đến trang chỉnh sửa, truyền state với dữ liệu nhân viên
    navigate(`/dashboard/employee/edit/${employee.id}`, { state: { employee } });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token không tồn tại hoặc đã hết hạn.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees(currentPage); // Refresh after deletion
    } catch (error) {
      console.error('Lỗi khi xóa nhân viên:', error);
    }
  };


  return (
    <div>
      <button
        onClick={() => navigate('/dashboard/employee/add')}
        className="bg-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center fixed right-4 bottom-4"
      >
        <div className="flex items-center justify-center w-full h-full">
          <FaPlus className="text-3xl" />
        </div>
      </button>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="px-4 py-2 border">Tên nhân viên</th>
            <th className="px-4 py-2 border">Giới tính</th>
            <th className="px-4 py-2 border">Địa chỉ</th>
            <th className="px-4 py-2 border">Số điện thoại</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Ngày sinh</th>
            <th className="px-4 py-2 border">CMND</th>
            <th className="px-4 py-2 border">Trạng thái</th>
            <th className="px-4 py-2 border">Loại nhân viên</th>
            <th className="px-4 py-2 border">Ngày tạo</th>
            <th className="px-4 py-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="12" className="text-center py-4">
                Đang tải...
              </td>
            </tr>
          ) : employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id} className="text-center">
                <td className="px-4 py-2 border">{employee.employeeName}</td>
                <td className="px-4 py-2 border">{employee.gender}</td>
                <td className="px-4 py-2 border">{employee.address}</td>
                <td className="px-4 py-2 border">{employee.phone}</td>
                <td className="px-4 py-2 border">{employee.email}</td>
                <td className="px-4 py-2 border">{employee.dob}</td>
                <td className="px-4 py-2 border">{employee.nationalIDNumber}</td>
                <td className="px-4 py-2 border">{employee.status}</td>
                <td className="px-4 py-2 border">{employee.employeeType ? employee.employeeType.nameEmployeeType : 'Không xác định'}</td>

                <td className="px-4 py-2 border">{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border flex items-center justify-center gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(employee)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center py-4">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
