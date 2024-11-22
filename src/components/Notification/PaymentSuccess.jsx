import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';
import { queryMomoPaymentStatus } from '../../services/paymentService';

const MySwal = withReactContent(Swal);

function PaymentSuccess() {
  useEffect(() => {
    let intervalId;
    let isPaymentChecked = false;

    const handlePaymentSuccess = async () => {
      try {
        // Lấy các tham số từ URL
        const searchParams = new URLSearchParams(window.location.search);
        const requestId = searchParams.get('requestId');
        const orderId = searchParams.get('orderId');

        if (!requestId || !orderId) {
          throw new Error('Thiếu thông tin thanh toán.');
        }

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
          allowOutsideClick: false, // Không cho phép nhấn ra ngoài
          allowEscapeKey: false, // Không cho phép đóng bằng phím Escape
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Gọi API kiểm tra trạng thái thanh toán mỗi 3 giây
        intervalId = setInterval(async () => {
          if (isPaymentChecked) return;

          const paymentStatus = await queryMomoPaymentStatus(
            requestId,
            orderId
          );

          // Xử lý kết quả trả về
          if (paymentStatus.success || paymentStatus.resultCode === 0) {
            isPaymentChecked = true;

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

            clearInterval(intervalId); // Dừng gọi API
          }
        }, 3000);
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

    handlePaymentSuccess();

    return () => {
      clearInterval(intervalId); // Dọn dẹp interval khi component bị hủy
      document.body.style.overflow = 'auto';
    };
  }, []);

  return null; // Không cần render gì thêm
}

export default PaymentSuccess;
