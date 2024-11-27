import React, { useState } from 'react';
import customerService from '../../../../services/customerService';

const CustomerForm = ({ customer, onCancel, onSave, usePatch = false }) => {
  const [customerName, setCustomerName] = useState(customer?.customerName || '');
  const [gender, setGender] = useState(customer?.gender || 'Male');
  const [address, setAddress] = useState(customer?.address || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [dob, setDob] = useState(customer?.dob || '');
  const [roles, setRoles] = useState(customer?.account?.roles || '');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      customerName,
      gender,
      address,
      phone,
      email,
      dob,
      roles,
    };

    try {
      if (usePatch) {
        await customerService.patchCustomer(customer.id, requestData);
      } else {
        await customerService.putCustomer(customer.id, requestData);
      }
      setMessage('Cập nhật thành công');
      onSave(requestData);
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin khách hàng:', error);
      setMessage(`Cập nhật không thành công: ${error.response?.data?.message || 'Lỗi không xác định'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl mb-4">Chỉnh sửa thông tin khách hàng</h2>
      {/* Các trường nhập liệu */}
      <div className="mb-4">
        <label className="block mb-2">Tên khách hàng</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Giới tính</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
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
      <div className="mb-4">
        <label className="block mb-2">Quyền</label>
        <input
          type="text"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      {message && <p className="text-red-500 mb-4">{message}</p>}
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

export default CustomerForm;
