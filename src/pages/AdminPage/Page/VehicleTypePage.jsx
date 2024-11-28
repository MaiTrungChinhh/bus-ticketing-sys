import React from 'react';
import VehicleType from '../../../components/Admin/ComponentPage/VehiclePage/VehicleType';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';

export default function VehicleTypePage() {
    return (
        <DefaultComponent title={"Quản lý loại xe"}>
            <VehicleType />
        </DefaultComponent>
    )
}
