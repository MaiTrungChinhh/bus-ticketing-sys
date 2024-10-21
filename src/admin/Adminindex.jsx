import React, { useState } from 'react';
import Login from '../Account/Login'; // Import component trang login

const Adminindex = () => {
    const [showLogin, setShowLogin] = useState(false); // Quản lý trạng thái hiển thị

    const handleLoginClick = () => {
        setShowLogin(true); // Khi nhấn vào nút, đổi trạng thái để hiển thị component Login
    };

    if (showLogin) {
        return <Login />; // Nếu trạng thái là true, hiển thị component Login
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Admin Page</h1>
                <button
                    onClick={handleLoginClick} // Gọi hàm khi nhấn nút
                    className="text-blue-500 hover:underline font-medium"
                >
                    Đăng nhập vào Admin
                </button>
            </div>
        </div>
    );
};

export default Adminindex;
