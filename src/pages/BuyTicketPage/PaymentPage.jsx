import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StepProgress from '../../components/StepProgress/StepProgress';
import { FaArrowRight } from 'react-icons/fa';
import {
  processMomoPayment,
  processZaloPayPayment,
  processVNPayPayment,
} from '../../services/paymentService';

// Import thư viện base-x
import baseX from 'base-x';

// Khai báo bảng mã Base62 (chứa các ký tự: 0-9, A-Z, a-z)
const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// Khởi tạo mã hóa Base62 từ bảng mã
const base62 = baseX(BASE62);

// Mã hóa chuỗi thành Base62
const base62Encode = (str) => {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(str); // Sử dụng TextEncoder để tạo Uint8Array
  return base62.encode(buffer); // Trả về chuỗi Base62
};

const PaymentMethods = ({ selectedPayment, handlePaymentChange }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-center text-primary text-3xl text-blue-500 font-bold uppercase mb-4">
        Phương thức thanh toán
      </h2>
      <div className="space-y-4 text-2xl">
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
  const seats = params.get('seats');
  const totalAmount = params.get('totalAmount');
  const tripDetails = JSON.parse(params.get('tripDetails') || '{}');
  const [selectedPayment, setSelectedPayment] = useState('momo');

  const [timeLeft, setTimeLeft] = useState(300); // 5 phút (300 giây)
  const [paymentProcessing, setPaymentProcessing] = useState(false); // Trạng thái thanh toán

  useEffect(() => {
    if (timeLeft <= 0) {
      window.history.back();
      alert('Hết thời gian thanh toán, ghế sẽ được mở lại.');
      // Gọi hàm mở khóa ghế tại đây
      // unlockSeats();
      return;
    }

    const countdown = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft]);

  const breadcrumbItems = [
    { label: 'Trang nhất', link: '/' },
    { label: 'Mua vé online', link: '/muave' },
    { label: 'Chọn chuyến' },
  ];

  const handlePaymentChange = useCallback(
    (method) => {
      setSelectedPayment(method);
    },
    [] // Empty dependency array so the function doesn't get recreated on every render
  );

  const handleConfirmPayment = async () => {
    try {
      const confirmation = window.confirm(
        `Bạn có chắc muốn thanh toán qua ${selectedPayment}?`
      );
      console.log('Confirmation:', confirmation); // Kiểm tra kết quả xác nhận
      if (!confirmation) return;

      let result;

      // Đảm bảo rằng seats là chuỗi trước khi gọi replace
      let seats1 = seats.replace(/, /g, '_');

      switch (selectedPayment.trim().toLowerCase()) {
        case 'momo':
          const paymentMomoData = {
            orderId: `${tripDetails?.tripId}_${tripDetails?.departureDate}_${seats1}`,
            orderInfo: `Thanh toán vé chuyến xe: ${tripDetails?.tripId}_${tripDetails?.departureDate}_${seats1}`,
            routeName: `${tripDetails?.route?.departureLocation} - ${tripDetails?.route?.arrivalLocation}`,
            departureTime: tripDetails?.departureTime,
            departureDate: tripDetails?.departureDate,
            departurePoint: tripDetails?.route?.departurePoint,
            amount: totalAmount,
            customerName: hoten,
            phone: dienthoai,
          };
          console.log('Payment MoMo Data:', paymentMomoData); // Kiểm tra dữ liệu trước khi gọi hàm
          result = await processMomoPayment(paymentMomoData);
          console.log('Result:', result); // Kiểm tra kết quả trả về sau khi gọi hàm
          if (result?.resultCode === 0) {
            window.location.href = `${result.payUrl}`;
          } else {
            alert('Thanh toán không thành công. Vui lòng thử lại.');
          }
          break;
        case 'zalopay':
          const paymentZaloData = {
            orderId: base62Encode(
              `${tripDetails?.tripId}_${tripDetails?.departureDate}_${seats1}`
            ),
            routeName: `${tripDetails?.route?.departureLocation} - ${tripDetails?.route?.arrivalLocation}`,
            departureTime: tripDetails?.departureTime,
            departureDate: tripDetails?.departureDate,
            departurePoint: tripDetails?.route?.departurePoint,
            amount: totalAmount,
            customerName: hoten,
            phone: dienthoai,
          };
          console.log('Payment Zalo Data:', paymentZaloData); // Kiểm tra dữ liệu trước khi gọi hàm
          result = await processZaloPayPayment(paymentZaloData);
          console.log('Result:', result); // Kiểm tra kết quả trả về sau khi gọi hàm
          if (result?.return_code === 1) {
            window.location.href = `${result.order_url}`;
          } else {
            alert('Thanh toán không thành công. Vui lòng thử lại.');
          }
          break;
        default:
          alert('Phương thức thanh toán không hợp lệ');
          return;
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      alert(
        'Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.'
      );
    }
  };

  return (
    <DefaultComponent>
      <div className="mx-20 flex flex-col">
        <Breadcrumb items={breadcrumbItems} />
        <StepProgress currentStep={2} />
        <div className="p-6">
          <div className="flex space-x-6">
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
                        {tripDetails?.route?.departureLocation}
                        <FaArrowRight className="mx-2" />
                        {tripDetails?.route?.arrivalLocation}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">
                        Ngày khởi hành:
                      </td>
                      <td className="px-4 py-2">
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
                        {tripDetails?.route?.departurePoint}
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
            <div className="flex-1">
              <PaymentMethods
                selectedPayment={selectedPayment}
                handlePaymentChange={handlePaymentChange}
              />
              <div className="mt-6 text-center text-2xl text-red-500">
                Thời gian còn lại để thanh toán: {Math.floor(timeLeft / 60)}:
                {timeLeft % 60 < 10 ? '0' : ''}
                {timeLeft % 60} phút
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleConfirmPayment}
              className="bg-green-500 text-white text-2xl py-2 px-4 rounded-lg"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </DefaultComponent>
  );
};

export default PaymentPage;
