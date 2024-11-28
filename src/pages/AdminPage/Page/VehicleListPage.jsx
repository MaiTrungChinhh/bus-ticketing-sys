import React from 'react';
import Vehicle from '../../../components/Admin/ComponentPage/VehiclePage/Vehicle';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';

export default function VehicleListPage() {
    return (
        <DefaultComponent title={"Quản lý xe"}>
            <Vehicle />
        </DefaultComponent>
    )
}
