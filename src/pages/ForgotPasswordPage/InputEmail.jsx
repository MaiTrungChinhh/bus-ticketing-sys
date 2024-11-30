import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterComponent from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { verifyEmail } from '../../services/forgotpasswordService';

export default function InputEmail() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Email không đúng định dạng. Vui lòng kiểm tra lại.');
            return;
        }

        setError(''); // Xóa lỗi nếu email đúng
        setLoading(true); // Hiển thị trạng thái loading

        try {
            // Gọi API verifyEmail
            const response = await verifyEmail(email);
            console.log('OTP đã gửi:', response);

            // Chuyển sang trang nhập OTP
            navigate('/user/verifyotp', { state: { email } });
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Đã xảy ra lỗi không xác định.';
            setError(errorMessage);
            console.error('Error:', err);
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <HeaderComponent />

            <div className="flex flex-col items-center justify-center flex-grow bg-gray-50">
                <div className="bg-white p-12 shadow-xl rounded-xl w-[500px]">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-700 text-center">Quên mật khẩu?</h1>
                        <h1 className="text-base text-blue-500 text-center mt-3">
                            Nhập Email đã đăng ký để reset mật khẩu
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block text-gray-600 font-medium text-lg mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-6 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                    }`}
                                placeholder="Nhập địa chỉ email của bạn"
                                required
                            />
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        >
                            {loading ? 'Đang gửi...' : 'Tiếp tục'}
                        </button>
                    </form>
                </div>
            </div>

            <FooterComponent />
        </div>
    );
}
