import React from 'react';
import AccountForm from '../../../components/Admin/AccountPage/AccountForm';

const EditAccountPage = ({ account }) => {
    const handleSave = (updatedAccount) => {
        console.log('Cập nhật tài khoản:', updatedAccount);
        // Gửi request cập nhật tài khoản
    };

    const handleCancel = () => {
        console.log('Hủy chỉnh sửa tài khoản');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Chỉnh sửa tài khoản</h2>
            <AccountForm account={account} onSave={handleSave} onCancel={handleCancel} />
        </div>
    );
};

export default EditAccountPage;
