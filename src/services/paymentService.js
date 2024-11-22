import axiosInstance from './Axios';

// Hàm xử lý thanh toán qua MoMo
export const processMomoPayment = async (paymentData) => {
  try {
    const response = await axiosInstance.post(
      '/momoPayment/create',
      paymentData
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thanh toán qua MoMo:', error);
    throw error;
  }
};

// Hàm kiểm tra trạng thái thanh toán qua MoMo
export const queryMomoPaymentStatus = async (requestId, orderId) => {
  try {
    const response = await axiosInstance.post('/momoPayment/query', {
      requestId,
      orderId,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi kiểm tra trạng thái thanh toán:', error);
    throw error;
  }
};

// Hàm xử lý thanh toán qua ZaloPay
export const processZaloPayPayment = async (paymentData) => {
  try {
    const response = await axiosInstance.post(
      '/zaloPayment/create',
      paymentData
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thanh toán qua ZaloPay:', error);
    throw error;
  }
};

// Hàm xử lý thanh toán qua VNPay
export const processVNPayPayment = async (paymentData) => {
  try {
    const response = await axiosInstance.post(
      `/api/vnpay/create`,
      paymentData,
      { params: { amount: paymentData.amount } } // Thêm các tham số vào URL nếu cần
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thanh toán qua VNPay:', error);
    throw error;
  }
};
