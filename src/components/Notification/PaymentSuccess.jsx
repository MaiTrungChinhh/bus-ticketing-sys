import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';
import {
  queryMomoPaymentStatus,
  queryZaloPayPaymentStatus,
  queryVNPayPaymentStatus,
} from '../../services/paymentService';
import { lockSeatsPayment } from '../../services/seatService';
import { CreateTicket } from '../../services/ticketService';

const MySwal = withReactContent(Swal);

function PaymentSuccess() {
  useEffect(() => {
    let intervalId;
    let isPaymentChecked = false;
    const ticketData = JSON.parse(localStorage.getItem('ticketData'));
    if (!ticketData) {
      console.error('Không tìm thấy thông tin vé');
      return;
    }

    const checkMomoPaymentStatus = async (requestId, orderId) => {
      return await queryMomoPaymentStatus(requestId, orderId);
    };

    const checkVNPayPaymentStatus = async (order_id, trans_date) => {
      return await queryVNPayPaymentStatus(order_id, trans_date);
    };

    const checkZaloPayPaymentStatus = async (app_trans_id) => {
      return await queryZaloPayPaymentStatus(app_trans_id);
    };

    const handlePaymentSuccess = async () => {
      try {
        // Lấy các tham số từ URL
        const searchParams = new URLSearchParams(window.location.search);
        const requestId = searchParams.get('requestId'); //mm
        const orderId = searchParams.get('orderId'); //mm
        const app_trans_id = searchParams.get('apptransid'); //zl
        const order_id = searchParams.get('vnp_TxnRef'); //vn
        const trans_date = searchParams.get('vnp_PayDate'); //vn

        const paymentMethodName = ticketData[0].paymentMethodName;

        // Hiển thị vòng xoay loading
        MySwal.fire({
          title:
            '<span class="text-blue-500 text-xl font-semibold">Đang kiểm tra thanh toán...</span>',
          html: `
            <div class="text-gray-700">
              <div class="loader mx-auto my-4"></div>
              <p class="text-lg">Vui lòng chờ...</p>
            </div>`,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        if (paymentMethodName === 'MoMo') {
          intervalId = setInterval(async () => {
            if (isPaymentChecked) return;

            const paymentStatus = await checkMomoPaymentStatus(
              requestId,
              orderId
            );
            if (paymentStatus.success || paymentStatus.resultCode === 0) {
              createTicket();
              showSuccessPopup();
              clearInterval(intervalId);
            }
          }, 3000);
        } else if (paymentMethodName === 'ZaloPay') {
          intervalId = setInterval(async () => {
            if (isPaymentChecked) return;

            const paymentStatus = await checkZaloPayPaymentStatus(app_trans_id);
            if (
              paymentStatus.return_code === 1 &&
              paymentStatus.sub_return_code === 1 &&
              paymentStatus.is_processing === false
            ) {
              createTicket();
              showSuccessPopup();
              clearInterval(intervalId);
            }
          }, 3000);
        } else if (paymentMethodName === 'VNPay') {
          intervalId = setInterval(async () => {
            if (isPaymentChecked) return;

            console.log(order_id, trans_date);
            const paymentStatus = await checkVNPayPaymentStatus(
              order_id,
              trans_date
            );
            if (
              paymentStatus.vnp_ResponseCode === '00' &&
              paymentStatus.vnp_TransactionStatus === '00'
            ) {
              createTicket();
              showSuccessPopup();
              clearInterval(intervalId);
            }
          }, 3000);
        }
      } catch (error) {
        clearInterval(intervalId); // Dừng gọi API nếu có lỗi
        MySwal.fire({
          title:
            '<span class="text-red-500 text-xl font-semibold">Thanh toán thất bại</span>',
          html: '<p class="text-gray-700 text-lg">Vui lòng thử lại sau.</p>',
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: false, // Không cho phép nhấn ra ngoài
          allowEscapeKey: false, // Không cho phép đóng bằng phím Escape
          confirmButtonText: 'Đóng',
          confirmButtonColor: '#f44336',
        });
      }
    };

    const createTicket = () => {
      const lockedSeats = JSON.parse(localStorage.getItem('lockedSeats'));
      isPaymentChecked = true;
      for (let i = 0; i < lockedSeats.length; i++) {
        lockSeatsPayment(lockedSeats[i]);
        const createTicketData = {
          actualTicketPrice: ticketData[0].actualTicketPrice,
          employeeId: null,
          customerId: null,
          tripId: ticketData[0].tripId,
          paymentMethodId: ticketData[0].paymentMethodId,
          seatId: lockedSeats[i],
          customerName: ticketData[0].customerName,
          phone: ticketData[0].phone,
          email: ticketData[0].email,
        };
        CreateTicket(createTicketData);
      }
    };
    const showSuccessPopup = () => {
      MySwal.fire({
        title:
          '<span class="text-green-500 text-xl font-semibold">Thanh toán thành công!</span>',
        html: `
        <div class="text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-green-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.586 4.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-lg">Cảm ơn bạn đã sử dụng dịch vụ!</p>
        </div>`,
        showConfirmButton: true,
        allowOutsideClick: false, // Không cho phép nhấn ra ngoài
        allowEscapeKey: false, // Không cho phép đóng bằng phím Escape
        confirmButtonText: 'Đóng',
        confirmButtonColor: '#4caf50',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = window.location.href.split('?')[0];
        }
      });
    };

    handlePaymentSuccess();

    return () => {
      clearInterval(intervalId); // Dọn dẹp interval khi component bị hủy
      document.body.style.overflow = 'auto';
    };
  }, []);

  return null; // Không cần render gì thêm
}

export default PaymentSuccess;
