import axiosInstance from './Axios';

/**
 * Gửi email để xác minh và gửi OTP
 * @param {string} email - Email của người dùng
 * @returns {Promise} - Kết quả từ API
 */
export const verifyEmail = async (email) => {
    try {
      const response = await axiosInstance.post(`/password/verifyEmail/${email}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Lỗi không xác định từ server.';
    }
  };
  
  

/**
 * Xác minh OTP được gửi tới email
 * @param {string} otp - Mã OTP
 * @param {string} email - Email của người dùng
 * @returns {Promise} - Kết quả từ API
 */
export const verifyOtp = async (otp, email) => {
  try {
    const response = await axiosInstance.post(`/password/verifyOtp/${otp}/${email}`);
    return response.data; // Trả về kết quả từ API
  } catch (error) {
    if (error.response) {
      throw error.response.data; // Xử lý lỗi từ server
    } else if (error.request) {
      throw 'Không nhận được phản hồi từ máy chủ. Vui lòng kiểm tra kết nối mạng.';
    } else {
      throw `Lỗi không xác định: ${error.message}`;
    }
  }
};

/**
 Đổi mật khẩu mới
 * @param {string} email - Email của người dùng
 * @param {string} password - Mật khẩu mới
 * @param {string} confirmPassword - Xác nhận mật khẩu
 * @param {string} otp - Mã OTP
 * @returns {Promise} - Kết quả từ API
 */
export const changePassword = async (email, password, confirmPassword, otp) => {
  try {
    const response = await axiosInstance.post(`/password/changePassword/${email}`, {
      password,
      confirmPassword,
      otp,
    });
    return response.data; // Trả về dữ liệu API
  } catch (error) {
    if (error.response) {
      throw error.response.data; // Lỗi từ server
    } else if (error.request) {
      throw 'Không nhận được phản hồi từ máy chủ. Vui lòng kiểm tra kết nối mạng.';
    } else {
      throw `Lỗi không xác định: ${error.message}`;
    }
  }
};
