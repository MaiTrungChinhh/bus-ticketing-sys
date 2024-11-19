import React, { useState } from 'react';

const EmployeeForm = ({ initialData = {}, onSubmit, onCancel, employeeTypes = [] }) => {
  // Khởi tạo state cho các trường dữ liệu
  const [address, setAddress] = useState(initialData.address || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [nationalIDNumber, setNationalIDNumber] = useState(initialData.nationalIDNumber || '');
  const [employeeTypeId, setEmployeeTypeId] = useState(initialData.employeeTypeId || '');
  const [dob, setDob] = useState(initialData.dob || '');
  const [roles, setRoles] = useState(initialData.roles || []);
  const [username, setUsername] = useState(initialData.username || ''); // Gắn giá trị username
  const [password, setPassword] = useState(initialData.password || '12345678');
  const [isUsernameEditable, setIsUsernameEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  const availableRoles = ['ADMIN', 'EMPLOYEE', 'GUEST']; // Vai trò có sẵn

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address || !phone || !email || !nationalIDNumber || !employeeTypeId || !dob) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    onSubmit({
      address,
      phone,
      email,
      nationalIDNumber,
      employeeTypeId,
      dob,
      roles,
      username,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl mb-4">{initialData.id ? 'Chỉnh Sửa Nhân Viên' : 'Thêm Nhân Viên'}</h2>

      {/* Tên nhân viên */}
      <div className="mb-4">
        <label className="block mb-2">Tên nhân viên</label>
        <input
          type="text"
          value={initialData.employeeName || ''}
          className="w-full p-2 border rounded bg-gray-200"
          readOnly
        />
      </div>

      {/* Giới tính */}
      <div className="mb-4">
        <label className="block mb-2">Giới tính</label>
        <select value={initialData.gender || 'Male'} className="w-full p-2 border rounded bg-gray-200" disabled>
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
        </select>
      </div>

      {/* Ngày sinh */}
      <div className="mb-4">
        <label className="block mb-2">Ngày sinh</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Địa chỉ */}
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

      {/* Số điện thoại */}
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

      {/* Email */}
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

      {/* CMND/CCCD */}
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

      {/* Loại nhân viên */}
      <div className="mb-4">
        <label className="block mb-2">Loại nhân viên</label>
        <select
          value={employeeTypeId}
          onChange={(e) => setEmployeeTypeId(e.target.value)}
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

      {/* Vai trò */}
      <div className="mb-4">
        <label className="block mb-2">Vai trò</label>
        <select
          value={roles[0] || 'EMPLOYEE'}
          onChange={(e) => setRoles([e.target.value])}
          className="w-full p-2 border rounded"
        >
          {availableRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Tên đăng nhập */}
      <div className="mb-4">
        <label className="block mb-2">Tên đăng nhập</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          readOnly={!isUsernameEditable}
        />
      </div>

      {/* Mật khẩu */}
      <div className="mb-4 relative">
        <label className="block mb-2">Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded pr-10"
          readOnly={!isPasswordEditable}
        />
      </div>

      {/* Nút hành động */}
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
