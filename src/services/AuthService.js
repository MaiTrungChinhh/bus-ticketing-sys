import axiosInstance from './Axios';
import axios from 'axios';

export const getGoogleLogin = async () => {
  try {
    const response = await fetch(
      'http://localhost:8080/api/auth/social-login?loginType=google',
      {
        method: 'GET',
        redirect: 'manual', // Ngăn trình duyệt tự động chuyển hướng
      }
    );

    if (response.status == 302) {
      // Lấy URL từ header `Location`
      const redirectUrl = response.headers.get('Location');
      console.log('URL chuyển hướng:', redirectUrl);
      if (redirectUrl) {
        return redirectUrl; // Trả về URL để sử dụng
      } else {
        throw new Error('Không tìm thấy URL chuyển hướng trong header.');
      }
    } else {
      throw new Error(`Lỗi khi gọi API: Mã trạng thái ${response.status}`);
    }
  } catch (error) {
    console.error('Lỗi khi gọi API đăng nhập Google:', error);
    throw error; // Ném lại lỗi để xử lý tại nơi gọi
  }
};

export const getFacebookLogin = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/auth/social-login?loginType=facebook'
    );
    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      throw new Error('Không có URL đăng nhập Google.');
    }
  } catch (error) {
    console.error('Lỗi khi gọi API đăng nhập Google:', error);
    throw error; // Ném lại lỗi để xử lý tại nơi gọi
  }
};

export const getGoogleCallback = async (code) => {
  try {
    const response = await axiosInstance.get('/auth/google/callback', {
      params: {
        code,
        loginType: 'google',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during Google callback:', error);
    throw error;
  }
};

export const getFacebookCallback = async (code) => {
  try {
    const response = await axiosInstance.get('/auth/facebook/callback', {
      params: {
        code,
        loginType: 'facebook',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during Facebook callback:', error);
    throw error;
  }
};
