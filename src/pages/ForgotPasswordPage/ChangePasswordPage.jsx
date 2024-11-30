import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FooterComponent from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { changePassword } from '../../services/forgotpasswordService';

export default function ChangePasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || ''; // Lấy email từ state khi điều hướng
    const otp = location.state?.otp || ''; // Lấy OTP từ state

    // Kiểm tra email và OTP trước khi render
    if (!email || !otp) {
        Swal.fire({
            title: 'Lỗi!',
            text: 'Không tìm thấy thông tin cần thiết. Vui lòng thử lại.',
            icon: 'error',
            confirmButtonText: 'OK',
        }).then(() => {
            navigate('/forgot-password'); // Chuyển về trang quên mật khẩu
        });
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu trùng khớp
        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.');
            return;
        }

        setError(''); // Xóa lỗi nếu mật khẩu hợp lệ

        try {
            // Gửi yêu cầu đổi mật khẩu đến API
            const response = await changePassword(email, password, confirmPassword, otp);
            console.log('Đổi mật khẩu thành công:', response);

            // Thông báo thành công và điều hướng
            Swal.fire({
                title: 'Thành công!',
                text: 'Đổi mật khẩu thành công! Hãy đăng nhập lại.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/login'); // Chuyển về trang đăng nhập
            });
        } catch (error) {
            // Hiển thị lỗi từ server hoặc các lỗi khác
            const errorMessage = error.message || 'Có lỗi xảy ra, vui lòng thử lại.';
            console.error('Lỗi đổi mật khẩu:', error);
            Swal.fire({
                title: 'Lỗi!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <HeaderComponent />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="bg-white p-12 shadow-xl rounded-xl w-[400px]">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-700 text-center">
                            Đổi mật khẩu
                        </h1>
                        <p className="text-base text-blue-500 text-center mt-3">
                            Nhập mật khẩu mới để đặt lại mật khẩu cho tài khoản của bạn.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-gray-600 font-medium text-lg mb-2"
                            >
                                Mật khẩu mới
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-6 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                    }`}
                                placeholder="Nhập mật khẩu mới"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-600 font-medium text-lg mb-2"
                            >
                                Xác nhận mật khẩu
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full px-6 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                    }`}
                                placeholder="Xác nhận mật khẩu"
                                required
                            />
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Đổi mật khẩu
                        </button>
                    </form>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}
