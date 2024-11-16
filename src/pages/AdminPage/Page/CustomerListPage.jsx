import React from 'react';
import Customer from '../../../components/Admin/ComponentPage/CustomerPage/Customer';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';

export default function CustomerListPage() {
    return (
        <DefaultComponent title="Quản lý người dùng">
            <Customer />
        </DefaultComponent>
    );
}
