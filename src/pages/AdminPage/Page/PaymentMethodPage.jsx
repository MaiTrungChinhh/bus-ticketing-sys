import React from 'react'
import PaymentMethod from '../../../components/Admin/ComponentPage/PaymentMethodPage/PaymentMethod'
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent'

export default function PaymentMethodPage() {
    return (
        <DefaultComponent title={"Danh sách phương thức thanh toán"}>
            <PaymentMethod />
        </DefaultComponent>
    )
}
