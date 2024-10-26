import React from 'react';
import Login from '../../Account/Login';
import FooterComponent from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';

const LoginPage = () => {
    return (
        <div>
            <HeaderComponent />
            <Login />
            <FooterComponent />
        </div>
    );
}

export default LoginPage;
