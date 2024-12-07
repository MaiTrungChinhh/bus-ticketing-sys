import React from 'react';

export default function UserInformation({ user }) {
    if (!user) {
        return <div className="text-center text-gray-500">Không có thông tin người dùng.</div>;
    }

    return (
        <div className="p-4 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Thông tin người dùng</h1>
            <div className="mb-4">
                <strong>Tên khách hàng:</strong> {user.customerName || 'N/A'}
            </div>
            <div className="mb-4">
                <strong>Giới tính:</strong> {user.gender || 'N/A'}
            </div>
            <div className="mb-4">
                <strong>Địa chỉ:</strong> {user.address || 'N/A'}
            </div>
            <div className="mb-4">
                <strong>Số điện thoại:</strong> {user.phone || 'N/A'}
            </div>
            <div className="mb-4">
                <strong>Email:</strong> {user.email || 'N/A'}
            </div>
            <div className="mb-4">
                <strong>Ngày sinh:</strong> {user.dob || 'N/A'}
            </div>
            <div className="mb-4">
                <strong>Vai trò:</strong> {user.roles || 'N/A'}
            </div>
        </div>
    );
}
