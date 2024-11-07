import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StepProgress from '../../components/StepProgress/StepProgress';
import { FaArrowRight } from 'react-icons/fa'; // Font Awesome arrow icon

const PaymentMethods = ({ selectedPayment, handlePaymentChange }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-center text-primary text-3xl text-blue-500 font-bold uppercase mb-4">
        Phương thức thanh toán
      </h2>
      <div className="space-y-4 text-2xl">
        {/* MoMo Payment Option */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedPayment === 'momo'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300'
          }`}
          onClick={() => handlePaymentChange('momo')}
        >
          <input
            type="radio"
            id="momo"
            name="payment"
            value="momo"
            checked={selectedPayment === 'momo'}
            onChange={() => handlePaymentChange('momo')}
            className="mr-2"
          />
          <label htmlFor="momo" className="cursor-pointer">
            MoMo (<span className="text-red-500">+0đ</span>)
          </label>
        </div>

        {/* ZaloPay Payment Option */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedPayment === 'zalopay'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300'
          }`}
          onClick={() => handlePaymentChange('zalopay')}
        >
          <input
            type="radio"
            id="zalopay"
            name="payment"
            value="zalopay"
            checked={selectedPayment === 'zalopay'}
            onChange={() => handlePaymentChange('zalopay')}
            className="mr-2"
          />
          <label htmlFor="zalopay" className="cursor-pointer">
            ZaloPay (<span className="text-red-500">+7,000đ</span>)
          </label>
        </div>

        {/* VNPay Payment Option */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedPayment === 'vnpay'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300'
          }`}
          onClick={() => handlePaymentChange('vnpay')}
        >
          <input
            type="radio"
            id="vnpay"
            name="payment"
            value="vnpay"
            checked={selectedPayment === 'vnpay'}
            onChange={() => handlePaymentChange('vnpay')}
            className="mr-2"
          />
          <label htmlFor="vnpay" className="cursor-pointer">
            VNPay (<span className="text-red-500">+21,000đ</span>)
          </label>
        </div>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const hoten = params.get('hoten');
  const dienthoai = params.get('dienthoai');
  const email = params.get('email');
  const kieudon = params.get('kieudon');
  const magiamgia = params.get('magiamgia');
  const seats = params.get('seats');
  const totalAmount = params.get('totalAmount');
  const tripDetails = JSON.parse(params.get('tripDetails'));

  const [selectedPayment, setSelectedPayment] = useState('momo');

  const breadcrumbItems = [
    { label: 'Trang nhất', link: '/' },
    { label: 'Mua vé online', link: '/muave' },
    { label: 'Chọn chuyến' },
  ];

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  return (
    <DefaultComponent>
      <div className="mx-20 flex flex-col">
        <Breadcrumb items={breadcrumbItems} />
        <StepProgress currentStep={2} />
        <div className="p-6">
          <div className="flex space-x-6">
            {' '}
            {/* Flex container */}
            {/* Ticket Information Section */}
            <div className="flex-1">
              <div className="border rounded-lg shadow-lg p-4">
                <h1 className="text-center text-primary text-3xl text-blue-500 font-bold uppercase mb-4">
                  Thông tin vé
                </h1>

                <table className="table-auto w-full border-collapse border border-gray-300 text-2xl">
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Tuyến:</td>
                      <td className="px-4 py-2 flex items-center">
                        {tripDetails?.route.departureLocation}
                        <FaArrowRight className="mx-2" />
                        {tripDetails?.route.arrivalLocation}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">
                        Ngày khởi hành:
                      </td>
                      <td className="px-4 py-2 flex items-center">
                        <strong className="text-red-500">
                          {tripDetails?.departureTime || 'N/A'}
                        </strong>
                        <span className="ml-4">
                          {tripDetails?.departureDate || 'N/A'}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Họ và tên:</td>
                      <td className="px-4 py-2">{hoten}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">
                        Số điện thoại:
                      </td>
                      <td className="px-4 py-2">{dienthoai}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Email:</td>
                      <td className="px-4 py-2">{email}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Điểm lên xe:</td>
                      <td className="px-4 py-2">
                        {tripDetails?.route.departurePoint}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Ghế đã chọn:</td>
                      <td className="px-4 py-2 text-blue-500 font-semibold">
                        {seats}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">Tổng tiền vé:</td>
                      <td className="px-4 py-2 text-money font-bold text-red-500">
                        {totalAmount} VND
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Payment Methods Section */}
            <div className="flex-1">
              <PaymentMethods
                selectedPayment={selectedPayment}
                handlePaymentChange={handlePaymentChange}
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <button className="bg-green-500 text-white text-2xl py-2 px-4 rounded-lg">
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </DefaultComponent>
  );
};

export default PaymentPage;
