import React from 'react';
import Login from '../../Account/Login';
import HeaderComponent from '../../components/Header/HeaderComponent';
import HomePage from '../HomePage/HomePage';


const LoginPage = () => {
    return (
        <HeaderComponent />,
        <HomePage />,
        <Login />
    )
}



export default LoginPage;
