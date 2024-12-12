import React, { useState } from 'react';

const RegisterAccount = () => {
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [gender, setGender] = useState('Nam');
    const [registerStatus, setRegisterStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { customerName, phone, username, email, password, address, dob, gender };

        try {
            const response = await fetch('http://localhost:8080/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.status === 201) {
                setRegisterStatus('Đăng ký thành công!');
                window.location.href = '/login';

            } else {
                setRegisterStatus(`Đăng ký thất bại: ${data.message}`);
            }
        } catch (error) {
            setRegisterStatus('Đăng ký thất bại. Vui lòng thử lại.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-xl">
                <h3 className="text-2xl font-bold text-center mb-6">Đăng ký</h3>

                <div className="mb-6">
                    <input
                        type="text"
                        name="customerName"
                        placeholder="Họ tên của bạn"
                        className="w-full p-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Số điện thoại"
                        className="w-full p-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        name="username"
                        placeholder="Tên đăng nhập"
                        className="w-full p-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email của bạn"
                        className="w-full p-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu của bạn"
                        className="w-full p-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        name="address"
                        placeholder="Địa chỉ"
                        className="w-full p-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="date"
                        name="dob"
                        className="w-full p-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-xl font-medium mb-4">Giới tính</label>
                    <div className="flex items-center">
                        <label className="mr-6 flex items-center text-xl">
                            <input
                                type="radio"
                                name="gender"
                                value="Nam"
                                checked={gender === 'Nam'}
                                onChange={() => setGender('Nam')}
                                className="mr-2"
                            />
                            Nam
                        </label>
                        <label className="mr-6 flex items-center text-xl">
                            <input
                                type="radio"
                                name="gender"
                                value="Nữ"
                                checked={gender === 'Nữ'}
                                onChange={() => setGender('Nữ')}
                                className="mr-2"
                            />
                            Nữ
                        </label>
                    </div>
                </div>

                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        required
                    />
                    <span>
                        Bằng việc đăng kí, bạn đã đồng ý với{' '}
                        <a href="#" className="text-blue-500 hover:underline">Điều khoản dịch vụ</a> &{' '}
                        <a href="#" className="text-blue-500 hover:underline">Chính sách bảo mật</a>
                    </span>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-4 rounded-lg text-xl hover:bg-blue-600 focus:outline-none"
                    >
                        Đăng ký
                    </button>
                </div>

                {registerStatus && (
                    <div className="mt-6 text-center text-xl text-red-500">
                        {registerStatus}
                    </div>
                )}

                <div className="mt-6 text-center text-xl">
                    <span>Đã có tài khoản?</span>
                    <a href="/login" className="ml-1 text-blue-500 hover:underline">
                        Đăng nhập ngay
                    </a>
                </div>
            </form>
        </div>
    );
};

export default RegisterAccount;
