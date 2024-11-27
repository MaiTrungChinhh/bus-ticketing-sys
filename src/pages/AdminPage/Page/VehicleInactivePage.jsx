import React from 'react'
import VehicleInactive from '../../../components/Admin/ComponentPage/VehiclePage/VehicleInactive'
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent'

export default function VehicleInactivePage() {
    return (
        <DefaultComponent title={"Danh sách xe không còn hoạt động"}>
            <VehicleInactive />
        </DefaultComponent>
    )
}
