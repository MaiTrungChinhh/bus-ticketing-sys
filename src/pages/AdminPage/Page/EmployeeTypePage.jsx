import React from 'react';
import EmployeeType from '../../../components/Admin/ComponentPage/EmployeePage/EmployeeType';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
export default function EmployeeTypePage() {
    return (
        <DefaultComponent title={"Quản lý loại nhân viên"}>
            <EmployeeType />
        </DefaultComponent>

    )
}
