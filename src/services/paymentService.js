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

export const queryZaloPayPaymentStatus = async (app_trans_id) => {
  try {
    const response = await axiosInstance.post('/zaloPayment/query', {
      app_trans_id,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi kiểm tra trạng thái thanh toán:', error);
    throw error;
  }
};

// Hàm xử lý thanh toán qua VNPay
export const processVNPayPayment = async (order_id, amount) => {
  try {
    const response = await axiosInstance.get(`/vnpay/create`, {
      params: {
        order_id: order_id,
        amount: amount,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thanh toán qua VNPay:', error);
    throw error;
  }
};

export const queryVNPayPaymentStatus = async (order_id, trans_date) => {
  try {
    const response = await axiosInstance.post(`/vnpay/query`, {
      order_id: order_id,
      trans_date: trans_date,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi truy vấn trạng thái thanh toán VNPay:', error);
    throw error;
  }
};

export const fetchPaymentMethods = async () => {
  try {
    const response = await axiosInstance.get('/paymentMethods');
    return response.data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};
