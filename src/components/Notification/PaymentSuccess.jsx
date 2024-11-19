import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);

function PaymentSuccess() {
  useEffect(() => {
    const handlePaymentSuccess = () => {
      // Hiển thị vòng xoay loading
      MySwal.fire({
        title:
          '<span class="text-blue-500 text-xl font-semibold">Đang xử lý...</span>',
        html: `
          <div class="text-gray-700">
            <div class="loader mx-auto my-4"></div>
            <p class="text-lg">Vui lòng chờ...</p>
          </div>`,
        showConfirmButton: false,
        allowOutsideClick: false, // Không cho phép đóng khi nhấn ngoài vùng modal
        didOpen: () => {
          Swal.showLoading(); // Hiển thị vòng xoay
        },
      });

      // Mô phỏng xử lý thành công
      setTimeout(() => {
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
          confirmButtonText: 'Đóng',
          confirmButtonColor: '#4caf50',
          customClass: {
            popup: 'bg-white shadow-md rounded-lg',
            confirmButton:
              'px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600',
          },
          allowOutsideClick: false, // Ngăn chặn đóng modal khi nhấn ngoài
        }).then((result) => {
          // Kiểm tra nếu người dùng đã nhấn 'Đóng'
          if (result.isConfirmed) {
            // Sau khi người dùng nhấn OK, xóa background mờ
            document.body.style.overflow = 'auto'; // Bật lại cuộn trang nếu bị khóa

            const currentUrl = window.location.href;
            const urlWithoutParams = currentUrl.split('?')[0]; // Loại bỏ phần query params

            // Tải lại trang mà không có query params
            window.location.href = urlWithoutParams;
          }
        });
      }, 3000); // 3 giây chờ xử lý
    };

    handlePaymentSuccess(); // Gọi hàm ngay khi component được render

    return () => {
      // Cleanup when component unmounts
      document.body.style.overflow = 'auto'; // Đảm bảo không bị khóa khi component bị unmount
    };
  }, []); // Empty dependency array để chỉ chạy một lần khi component mount

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      {/* Không cần nút bấm nữa */}
    </div>
  );
}

export default PaymentSuccess;
