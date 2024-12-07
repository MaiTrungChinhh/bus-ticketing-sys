import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const GoogleCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const processCallback = async () => {
            console.log("Current URL:", window.location.href);

            const params = new URLSearchParams(window.location.search);
            const code = params.get("code"); // Lấy mã code từ URL
            const state = params.get("state"); // Lấy tham số state từ URL

            console.log("Code:", code);
            console.log("State:", state);

            if (!code) {
                alert("Không tìm thấy mã code trong URL callback.");
                return navigate("/login"); // Quay lại trang login nếu không có code
            }

            try {
                const response = await AuthService.callbackGoogle({ code, state });
                console.log("Phản hồi từ backend:", response);

                if (response.token) {
                    localStorage.setItem("token", response.token);
                    navigate("/dashboard"); // Chuyển đến dashboard
                } else {
                    alert("Đăng nhập thất bại. Vui lòng thử lại.");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Lỗi khi gửi mã code đến backend:", error);
                alert(error.message || "Đăng nhập thất bại.");
                navigate("/login");
            }
        };

        processCallback();
    }, [navigate]);

    return <div>Đang xử lý đăng nhập Google...</div>;
};

export default GoogleCallback;
