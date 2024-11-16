import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
    const [status, setStatus] = useState('ACTIVE'); // Giá trị mặc định cho trạng thái
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchEmployeeTypes();
    }, []);

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
                    Authorization: `Bearer ${token}`
                }
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

        const url = 'http://localhost:8080/api/employees';
        const method = 'post';

        // Chỉnh sửa requestData cho đúng với yêu cầu API
        const requestData = {
            employeeName,       // Đổi "name" thành "employeeName"
            gender,
            address,
            phone,
            email,
            dob,
            nationalIDNumber,   // Đổi "idCard" thành "nationalIDNumber"
            employeeTypeId: employeeType,
            status
        };

        try {
            const response = await axios({
                method,
                url,
                data: requestData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Lưu thành công');
            window.location.href = '/dashboard/employees/list';
        } catch (error) {
            console.error('Lỗi khi lưu nhân viên:', error);
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data);
                setMessage(`Lưu không thành công: ${error.response.data.message || 'Lỗi không xác định'}`);
            } else {
                setMessage('Lưu không thành công');
            }
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
