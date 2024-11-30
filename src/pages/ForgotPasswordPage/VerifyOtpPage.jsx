import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FooterComponent from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { verifyOtp } from '../../services/forgotpasswordService';

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || ''; // Lấy email từ state khi điều hướng

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra OTP có phải là 6 chữ số
        if (!/^\d{6}$/.test(otp)) {
            setError('OTP không hợp lệ. Vui lòng nhập đúng mã gồm 6 chữ số.');
            return;
        }

        setError(''); // Xóa lỗi nếu OTP hợp lệ

        try {
            // Gọi API để xác minh OTP
            const response = await verifyOtp(otp, email);

            // Kiểm tra response từ server
            if (response.code === 200) {
                console.log(response.message); // Hiển thị thông báo thành công (hoặc điều hướng)
                navigate('/user/changepassword', { state: { email, otp } });
            } else {
                setError(response.message || 'Đã xảy ra lỗi không xác định.');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Đã xảy ra lỗi khi xác minh OTP.';
            setError(errorMessage);
            console.error('Lỗi:', err);
        }
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">

            <HeaderComponent />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="bg-white p-12 shadow-xl rounded-xl w-[400px]">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-700 text-center">
                            Nhập mã OTP
                        </h1>
                        <p className="text-base text-blue-500 text-center mt-3">
                            Hệ thống đã gửi mã OTP đến địa chỉ email của bạn<b>{email}</b>.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="otp"
                                className="block text-gray-600 font-medium text-lg mb-2"
                            >
                                Mã OTP
                            </label>
                            <input
                                id="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className={`w-full px-6 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                    }`}
                                placeholder="Nhập mã OTP gồm 6 chữ số"
                                maxLength={6}
                                required
                            />
                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Xác nhận
                        </button>
                    </form>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}
