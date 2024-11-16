import React from 'react';
import Employee from '../../../components/Admin/ComponentPage/EmployeePage/Employee';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
const ListEmployeePage = () => {
    return (
        <DefaultComponent title={"Quản lý nhân viên"}>
            <Employee />
        </DefaultComponent>
    );
};

export default ListEmployeePage;
