import React from 'react';
import RegisterAccount from '../../Account/RegisterAccout'; // Đảm bảo không trùng lặp tên
import HeaderComponent from '../../components/Header/HeaderComponent';
import HomePage from '../HomePage/HomePage';

const RegisterPage = () => {
    return (

        <HeaderComponent />,
        <HomePage />,
        <RegisterAccount />

    );
};

export default RegisterPage;
