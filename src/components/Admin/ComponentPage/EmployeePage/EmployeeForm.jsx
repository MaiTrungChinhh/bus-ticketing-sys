import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EmployeeForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [address, setAddress] = useState(initialData.address || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [nationalIDNumber, setNationalIDNumber] = useState(initialData.nationalIDNumber || '');
  const [employeeType, setEmployeeType] = useState(initialData.employeeTypeId || '');
  const [employeeTypes, setEmployeeTypes] = useState([]);

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token không tồn tại hoặc đã hết hạn.');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/employeeTypes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Kiểm tra cấu trúc dữ liệu trả về từ API
        console.log('API response:', response.data);

        if (response.data.result && Array.isArray(response.data.result.contents)) {
          setEmployeeTypes(response.data.result.contents);
        } else {
          console.error('Dữ liệu không đúng định dạng mong đợi:', response.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách loại nhân viên:', error);
      }
    };

    fetchEmployeeTypes();
  }, []);

  useEffect(() => {
    if (initialData.employeeTypeId && employeeTypes.length > 0) {
      const selectedType = employeeTypes.find(type => type.id === initialData.employeeTypeId);
      if (selectedType) {
        setEmployeeType(selectedType.id);
      }
    }
  }, [employeeTypes, initialData.employeeTypeId]);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ address, phone, email, nationalIDNumber, employeeTypeId: employeeType });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl mb-4">{initialData.id ? 'Chỉnh Sửa Nhân Viên' : 'Thêm Nhân Viên'}</h2>

      {/* Không cho phép chỉnh sửa tên nhân viên */}
      <div className="mb-4">
        <label className="block mb-2">Tên nhân viên</label>
        <input
          type="text"
          value={initialData.employeeName || ''}
          className="w-full p-2 border rounded bg-gray-200"
          readOnly
        />
      </div>

      {/* Không cho phép chỉnh sửa giới tính */}
      <div className="mb-4">
        <label className="block mb-2">Giới tính</label>
        <select value={initialData.gender || 'Nam'} className="w-full p-2 border rounded bg-gray-200" disabled>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>

      {/* Cho phép chỉnh sửa Địa chỉ */}
      <div className="mb-4">
        <label className="block mb-2">Địa chỉ</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Cho phép chỉnh sửa Số điện thoại */}
      <div className="mb-4">
        <label className="block mb-2">Số điện thoại</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Cho phép chỉnh sửa Email */}
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Cho phép chỉnh sửa CMND/CCCD */}
      <div className="mb-4">
        <label className="block mb-2">CMND/CCCD</label>
        <input
          type="text"
          value={nationalIDNumber}
          onChange={(e) => setNationalIDNumber(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Dropdown Loại nhân viên */}
      <div className="mb-4">
        <label className="block mb-2">Loại nhân viên</label>
        <select
          value={employeeType}
          onChange={(e) => setEmployeeType(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Chọn loại nhân viên</option>
          {employeeTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.nameEmployeeType}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button type="button" onClick={onCancel} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
          Hủy
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Lưu
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
