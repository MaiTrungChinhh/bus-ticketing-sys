import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';

const AddCustomerPage = () => {
    const [customerName, setCustomerName] = useState('');
    const [gender, setGender] = useState('Male');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('12345678'); // Mật khẩu mặc định
    const [message, setMessage] = useState('');
    const [isUsernameEditable, setIsUsernameEditable] = useState(false);
    const [isPasswordEditable, setIsPasswordEditable] = useState(false);

    useEffect(() => {
        const generateUsername = (name) => {
            if (!name) return '';
            return name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, '')
                .toLowerCase();
        };
        setUsername(generateUsername(customerName));
    }, [customerName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("Token không tồn tại hoặc đã hết hạn");
            setMessage('Token không tồn tại hoặc đã hết hạn');
            return;
        }

        try {
            // Tạo khách hàng với vai trò mặc định là GUEST
            const response = await axios.post('http://localhost:8080/api/customers', {
                customerName,
                gender,
                address,
                phone,
                email,
                dob,
                username,
                password,
                roles: ['GUEST'], // Vai trò mặc định là GUEST
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage('Tạo khách hàng thành công');
            window.location.href = '/dashboard/customers/list';
        } catch (error) {
            console.error('Lỗi khi tạo khách hàng:', error);
            setMessage(`Tạo không thành công: ${error.response?.data?.message || 'Lỗi không xác định'}`);
        }
    };

    const handleCancel = () => {
        window.location.href = '/dashboard/customers/list';
    };

    return (
        <DefaultComponent title="Thêm khách hàng">
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
                <h2 className="text-2xl mb-4">Thêm khách hàng</h2>
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
                <div className="mb-4 relative">
                    <label className="block mb-2">Tên đăng nhập</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded pr-10"
                        readOnly={!isUsernameEditable}
                    />
                    <button
                        type="button"
                        onClick={() => setIsUsernameEditable(!isUsernameEditable)}
                        className="absolute right-2 top-2 text-gray-500"
                    >
                        <FaEdit />
                    </button>
                </div>
                <div className="mb-4 relative">
                    <label className="block mb-2">Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded pr-10"
                        readOnly={!isPasswordEditable}
                    />
                    <button
                        type="button"
                        onClick={() => setIsPasswordEditable(!isPasswordEditable)}
                        className="absolute right-2 top-2 text-gray-500"
                    >
                        <FaEdit />
                    </button>
                    {!isPasswordEditable && (
                        <p className="text-red-500 text-sm mt-2">Mật khẩu mặc định: 12345678</p>
                    )}
                </div>


                {message && <p className="text-red-500 mb-4">{message}</p>}
                <div className="flex justify-end">
                    <button type="button" onClick={handleCancel} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
                        Hủy
                    </button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Lưu
                    </button>
                </div>
            </form>
        </DefaultComponent>
    );
};

export default AddCustomerPage;
