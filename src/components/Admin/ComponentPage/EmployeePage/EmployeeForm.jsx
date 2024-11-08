// EmployeeForm.jsx
import React, { useState } from 'react';

const EmployeeForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData.name || '');
  const [gender, setGender] = useState(initialData.gender || 'Nam');
  const [address, setAddress] = useState(initialData.address || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [dob, setDob] = useState(initialData.dob || '');
  const [idCard, setIdCard] = useState(initialData.idCard || '');
  const [employeeType, setEmployeeType] = useState(initialData.employeeType || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, gender, address, phone, email, dob, idCard, employeeType });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl mb-4">Thêm nhân viên</h2>
      <div className="mb-4">
        <label className="block mb-2">Tên</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Giới tính</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>
      {/* Các trường khác tương tự */}
      <div className="flex justify-end">
        <button type="button" onClick={onCancel} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">Hủy</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Lưu</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
