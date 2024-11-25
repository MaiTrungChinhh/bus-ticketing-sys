import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import StepProgress from '../../components/StepProgress/StepProgress';
import {
  processMomoPayment,
  processVNPayPayment,
  processZaloPayPayment,
} from '../../services/paymentService';
import Swal from 'sweetalert2';
import { fetchPaymentMethods } from '../../services/paymentService';

const PaymentMethods = ({
  selectedPayment,
  handlePaymentChange,
  paymentMethods,
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-center text-primary text-3xl text-blue-500 font-bold uppercase mb-4">
        Phương thức thanh toán
      </h2>
      <div className="space-y-4 text-2xl">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedPayment === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300'
            }`}
            onClick={() => handlePaymentChange(method.id)}
          >
            <input
              type="radio"
              id={method.id}
              name="payment"
              value={method.id}
              checked={selectedPayment.id === method.id}
              onChange={() => handlePaymentChange(method)}
              className="mr-2"
            />
            <label htmlFor={method.id} className="cursor-pointer">
              {method.methodName}
            </label>
          </div>
        ))}
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
  const [selectedPayment, setSelectedPayment] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 phút (300 giây)
  const [paymentProcessing, setPaymentProcessing] = useState(false); // Trạng thái thanh toán

  useEffect(() => {
    fetchPaymentMethods().then((data) => {
      const userRole = 'GUEST'; // Set role to "GUEST"
      if (data.code === 200 && Array.isArray(data.result?.contents)) {
        // Filter payment methods based on the "GUEST" role
        const guestPaymentMethods = data.result.contents.filter(
          (paymentMethod) => paymentMethod.roles.includes(userRole)
        );
        setPaymentMethods(guestPaymentMethods); // Set the filtered payment methods
      } else {
        setPaymentMethods([]); // Set an empty array if no valid data
      }
    });
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      window.history.back();
      alert('Hết thời gian thanh toán, ghế sẽ được mở lại.');
      return;
    }
    const countdown = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft]);

  const breadcrumbItems = [
    { label: 'Trang nhất', link: '/', className: 'text-2xl' },
    { label: 'Mua vé online', link: '/muave', className: 'text-2xl' },
    { label: 'Chọn chuyến', className: 'text-2xl' },
  ];

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  const handleConfirmPayment = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: 'Xác nhận thanh toán',
        text: `Bạn có chắc muốn thanh toán qua ${selectedPayment.methodName}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      });

      if (!isConfirmed) return;

      const ticketData = {
        actualTicketPrice: totalAmount / seats.length, // Tổng giá trị vé
        tripId: tripDetails.tripId || '',
        paymentMethodName: selectedPayment.methodName,
        paymentMethodId: selectedPayment.id, // Phương thức thanh toán
        customerName: hoten, // Tên khách hàng
        phone: dienthoai, // Số điện thoại
        email: email, // Email khách hàng
      };

      localStorage.removeItem('ticketData');
      let ticketArray = JSON.parse(localStorage.getItem('ticketData')) || [];
      ticketArray.push(ticketData); // Thêm đối tượng vé mới vào mảng
      localStorage.setItem('ticketData', JSON.stringify(ticketArray));

      let result;
      let seats1 = seats.replace(/, /g, '_');

      switch (selectedPayment.methodName.trim().toLowerCase()) {
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
          result = await processMomoPayment(paymentMomoData);
          if (result?.resultCode === 0) {
            window.location.href = `${result.payUrl}`;
          } else {
            Swal.fire({
              title: 'Thanh toán không thành công',
              text: 'Vui lòng thử lại.',
              icon: 'error',
            });
          }
          break;
        case 'zalopay':
          const paymentZaloData = {
            orderId: `${tripDetails?.tripId}_${tripDetails?.departureDate}_${seats1}`,
            routeName: `${tripDetails?.route?.departureLocation} - ${tripDetails?.route?.arrivalLocation}`,
            departureTime: tripDetails?.departureTime,
            departureDate: tripDetails?.departureDate,
            departurePoint: tripDetails?.route?.departurePoint,
            amount: totalAmount,
            customerName: hoten,
            phone: dienthoai,
          };
          result = await processZaloPayPayment(paymentZaloData);
          if (result?.return_code === 1) {
            window.location.href = `${result.order_url}`;
          } else {
            Swal.fire({
              title: 'Thanh toán không thành công',
              text: 'Vui lòng thử lại.',
              icon: 'error',
            });
          }
          break;
        case 'vnpay':
          const orderId = `${tripDetails?.tripId}_${tripDetails?.departureDate}_${seats1}`;
          const amount = totalAmount;

          result = await processVNPayPayment(orderId, amount);
          if (result?.code === 200) {
            window.location.href = `${result.result}`;
          } else {
            Swal.fire({
              title: 'Thanh toán không thành công',
              text: 'Vui lòng thử lại.',
              icon: 'error',
            });
          }
          break;
        default:
          Swal.fire({
            title: 'Lỗi',
            text: 'Phương thức thanh toán không hợp lệ',
            icon: 'error',
          });
          return;
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      Swal.fire({
        title: 'Lỗi',
        text: 'Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.',
        icon: 'error',
      });
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
                        {parseInt(totalAmount).toLocaleString('vi-VN')} VND
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
                paymentMethods={paymentMethods}
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
