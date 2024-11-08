import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit , FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const EmployeeTable = ({ onDelete }) => {
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (user) => {
    navigate(`/admin/employees/edit/${user.id}`, { state: { account: user } });
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8080/api/accounts', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { page: page, pageSize: 4, sort: 'username' }
      });

      if (response.data.result && Array.isArray(response.data.result.contents)) {
        setAccounts(response.data.result.contents);
        setTotalPages(response.data.result.totalPages);
        // If current page exceeds total pages after deletion, set current page to the last available page
        if (page > response.data.result.totalPages && response.data.result.totalPages > 0) {
          setCurrentPage(response.data.result.totalPages);
        }
      } else {
        console.error("Dữ liệu không đúng định dạng mong đợi:", response.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const totalNumberPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(totalPages, totalNumberPagesToShow);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - totalNumberPagesToShow + 1);
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          &lt;
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="px-6 py-4 border">Tên tài khoản</th>
            <th className="px-6 py-4 border">Quyền</th>
            <th className="px-6 py-4 border">Quản lý</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center py-4">Đang tải...</td>
            </tr>
          ) : (
            Array.isArray(accounts) && accounts.length > 0 ? accounts.map((account) => (
              <tr key={account.id} className="text-center">
                <td className="px-6 py-4 border">{account.username}</td>
                <td className="px-6 py-4 border">{account.roles.join(", ")}</td>
                <td className="px-6 py-4 border flex items-center justify-center">
                  <button
                    onClick={() => handleEdit(account)}
                    className="bg-blue-500 text-white px-3 py-2 rounded flex items-center"
                  >
                    <FaEdit className="mr-1" />
                  </button>
                  <span className="mx-2">|</span>
                  <button
                    onClick={async () => {
                      if (window.confirm("Bạn chắc chắn xóa chứ?")) {
                        await onDelete(account.id);
                        fetchUsers(currentPage);
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-2 rounded flex items-center"
                  >
                    <MdDelete className="mr-1" />
                  </button>
                  <button
                    onClick={() => onEdit(null)}
                    className="bg-blue-500 text-white w-20 h-20 rounded-full flex items-center justify-center fixed right-4 bottom-4"
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <FaPlus className="text-3xl" />
                    </div>
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="text-center py-4">Không có tài khoản nào</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default EmployeeTable;
