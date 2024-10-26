import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();  // Lấy phản hồi từ server

            // Kiểm tra mã phản hồi từ server
            if (response.status === 201 && data.result.token) {
                localStorage.setItem('token', data.result.token);  // Lưu token vào localStorage
                localStorage.setItem('username', username);  // Lưu tên đăng nhập vào localStorage
                setLoginStatus('Đăng nhập thành công!');  // Hiển thị thông báo thành công
            } else {
                setLoginStatus(`Đăng nhập thất bại: ${data.message}`);  // Hiển thị lỗi nếu có
            }
        } catch (error) {
            setLoginStatus('Đăng nhập thất bại. Vui lòng thử lại.');  // Hiển thị lỗi nếu đăng nhập thất bại
            console.error('Error:', error);
        }
    };
    const fetchProtectedData = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8080/api/protected', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);
    };



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">

            <form className="bg-white p-16 rounded-lg shadow-2xl w-full max-w-3xl" onSubmit={handleLogin}>
                <h3 className="text-5xl font-bold text-center mb-12">Đăng nhập</h3>

                <div className="mb-8">
                    <input
                        type="text"
                        name="username"
                        placeholder="Tên đăng nhập"
                        className="w-full p-5 border border-gray-300 rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-8">
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        className="w-full p-5 border border-gray-300 rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="text-center mb-8">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-5 rounded-lg text-2xl hover:bg-blue-600 focus:outline-none"
                    >
                        Đăng Nhập
                    </button>
                </div>

                {/* Hiển thị trạng thái đăng nhập */}
                {loginStatus && (
                    <div className="mt-8 text-center text-2xl text-red-500">
                        {loginStatus}
                    </div>
                )}
                <div className="mt-8 text-center">
                    <span className="text-xl">Chưa có tài khoản?</span>
                    <a href="/register" className="ml-1 text-blue-500 text-xl hover:underline">
                        Đăng ký ngay!
                    </a>
                </div>
            </form>

        </div>
    );
};

export default Login; 