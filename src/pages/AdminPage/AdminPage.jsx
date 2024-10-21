import React from 'react';
import Login from '../../Account/Login';
import AdminComponent from '../../admin/Adminindex';

const AdminPage = () => {
    return (
        <AdminComponent>

            <Login>Đăng nhập</Login>
        </AdminComponent>

    );
};

export default AdminPage;