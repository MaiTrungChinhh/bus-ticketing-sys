import React from 'react';
import RegisterAccount from '../../Account/RegisterAccout';
import FooterComponent from '../../components/Footer/FooterComponent'; // Thêm Footer để hiển thị đầy đủ giao diện
import HeaderComponent from '../../components/Header/HeaderComponent';

const RegisterPage = () => {
    return (
        <div>
            <HeaderComponent />
            <RegisterAccount />
            <FooterComponent />
        </div>
    );
};

export default RegisterPage;
