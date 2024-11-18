import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';

const AddEmployeePage = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [gender, setGender] = useState('Male');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [nationalIDNumber, setNationalIDNumber] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [status, setStatus] = useState('ACTIVE'); // Trạng thái mặc định
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('12345678');
    const [isUsernameEditable, setIsUsernameEditable] = useState(false);
    const [isPasswordEditable, setIsPasswordEditable] = useState(false);

    useEffect(() => {
        fetchEmployeeTypes();
    }, []);
    const generatePassword = () => {
        return Math.random().toString(36).slice(-8); // Tạo mật khẩu ngẫu nhiên 8 ký tự
    };

    const fetchEmployeeTypes = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token không tồn tại hoặc đã hết hạn");
            setMessage('Token không tồn tại hoặc đã hết hạn');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/api/employeeTypes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.result && Array.isArray(response.data.result.contents)) {
                setEmployeeTypes(response.data.result.contents);
            } else {
                console.error('Dữ liệu không đúng định dạng mong đợi:', response.data);
                setMessage('Không thể lấy danh sách loại nhân viên.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách loại nhân viên:', error);
            setMessage('Lỗi khi lấy danh sách loại nhân viên.');
        }
    };
    useEffect(() => {
        const generateUsername = (name) => {
            if (!name) return '';
            return name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
                .replace(/\s+/g, '') // Loại bỏ khoảng trắng
                .toLowerCase();
        };
        setUsername(generateUsername(employeeName)); // Cập nhật username từ employeeName
    }, [employeeName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("Token không tồn tại hoặc đã hết hạn");
            setMessage('Token không tồn tại hoặc đã hết hạn');
            return;
        }

        if (!employeeType) {
            setMessage("Vui lòng chọn loại nhân viên.");
            return;
        }

        try {
            // Bước 1: Gửi yêu cầu tạo nhân viên
            const employeeResponse = await axios.post('http://localhost:8080/api/employees', {
                employeeName,
                gender,
                address,
                phone,
                email,
                dob,
                nationalIDNumber,
                employeeTypeId: employeeType,
                status,
                username,
                password,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const employeeId = employeeResponse.data.result.id;

            // Bước 2: Gửi yêu cầu tạo tài khoản
            const accountResponse = await axios.post('http://localhost:8080/api/accounts', {
                username,
                password, // Mật khẩu ngẫu nhiên
                roles: ['EMPLOYEE'],
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const accountId = accountResponse.data.result.id;

            // Bước 3: Liên kết tài khoản với nhân viên
            await axios.patch(`http://localhost:8080/api/employees/${employeeId}`, {
                accountId,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage('Tạo nhân viên và tài khoản thành công');
            window.location.href = '/dashboard/employees/list';
        } catch (error) {
            console.error('Lỗi khi lưu nhân viên:', error);
            setMessage(`Lưu không thành công: ${error.response?.data?.message || 'Lỗi không xác định'}`);
        }
    };


    const handleCancel = () => {
        window.location.href = '/dashboard/employees/list';
    };

    return (
        <DefaultComponent title="Thêm nhân viên">
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
                <h2 className="text-2xl mb-4">Thêm nhân viên</h2>
                <div className="mb-4">
                    <label className="block mb-2">Tên nhân viên</label>
                    <input
                        type="text"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
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
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
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
                    <label className="block mb-2">Căn cước công dân</label>
                    <input
                        type="text"
                        value={nationalIDNumber}
                        onChange={(e) => setNationalIDNumber(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
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

                <div className="mb-4">
                    <label className="block mb-2">Trạng thái</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select>
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

export default AddEmployeePage;
