import axios from 'axios';
import React, { useState } from 'react';

const CustomerForm = ({ customer, onCancel, onSave, usePatch = false }) => {
  const [customerName, setCustomerName] = useState(customer?.customerName || '');
  const [gender, setGender] = useState(customer?.gender || 'Male');
  const [address, setAddress] = useState(customer?.address || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [dob, setDob] = useState(customer?.dob || '');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra log dữ liệu để xác nhận
    const employeeData = {
      address,
      phone,
      email,
      nationalIDNumber,
      employeeTypeId: employeeType
    };

    console.log("Dữ liệu gửi đi:", employeeData);

    onSubmit(employeeData);
  };


  const patchCustomerInfo = async () => {
    const url = `http://localhost:8080/api/customers/${customer.id}`;
    const method = 'patch';

    const requestData = {};
    if (customerName !== customer.customerName) requestData.customerName = customerName;
    if (gender !== customer.gender) requestData.gender = gender;
    if (address !== customer.address) requestData.address = address;
    if (phone !== customer.phone) requestData.phone = phone;
    if (email !== customer.email) requestData.email = email;
    if (dob !== customer.dob) requestData.dob = dob;

    if (Object.keys(requestData).length === 0) {
      setMessage('Không có thay đổi nào để cập nhật.');
      return;
    }

    try {
      const response = await axios({
        method,
        url,
        data: requestData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Cập nhật thành công');
      onSave(response.data);
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin khách hàng:', error);
      if (error.response) {
        setMessage(`Cập nhật không thành công: ${error.response.data.message || 'Lỗi không xác định'}`);
      } else {
        setMessage('Cập nhật không thành công');
      }
    }
  };

  const putCustomerInfo = async () => {
    const url = `http://localhost:8080/api/customers/${customer.id}`;
    const method = 'put';

    const requestData = {
      customerName,
      gender,
      address,
      phone,
      email,
      dob,
    };

    try {
      const response = await axios({
        method,
        url,
        data: requestData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Cập nhật thành công');
      onSave(response.data);
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin khách hàng:', error);
      if (error.response) {
        setMessage(`Cập nhật không thành công: ${error.response.data.message || 'Lỗi không xác định'}`);
      } else {
        setMessage('Cập nhật không thành công');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl mb-4">Chỉnh sửa thông tin khách hàng</h2>
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
