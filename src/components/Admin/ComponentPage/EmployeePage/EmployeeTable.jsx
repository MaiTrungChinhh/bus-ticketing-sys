import React from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const EmployeeTable = ({ employees, loading, onEdit, onDelete, onAdd }) => {
  return (
    <div>
      <button
        onClick={onAdd}
        className="bg-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center fixed right-4 bottom-4 shadow-lg"
      >
        <FaPlus className="text-3xl" />
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
            <th className="px-4 py-2 border">Quản lý</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="12" className="text-center py-4">Đang tải...</td>
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
                <td className="px-4 py-2 border">
                  {employee.employeeType?.nameEmployeeType || 'Không xác định'}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(employee.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border flex items-center justify-center gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => onEdit(employee)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => onDelete(employee)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center py-4">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
