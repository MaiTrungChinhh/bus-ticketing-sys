import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const generateRandomState = () => {
    return [...Array(32)] // Tạo chuỗi 32 ký tự ngẫu nhiên
        .map(() => Math.random().toString(36)[2])
        .join("");
};
// TUẤN XEM LẠI NHA ÔNG , CHỖ NÀY GỌI API HAY LÀ TỰ TẠO URL
const AuthService = {
    loginGoogle: async () => {
        try {
            const responseType = "code"; // Sử dụng Authorization Code Flow
            const clientId =
                "1081804098772-00o3b1j3apnn01npo87diofpc536kvg1.apps.googleusercontent.com"; // Client ID của bạn
            const redirectUri =
                "http://localhost:3000/api/auth/google/callback"; // URL đã cấu hình
            const scope = "email profile";
            const state = generateRandomState(); // Sinh ngẫu nhiên state

            // Tạo URL đầy đủ để chuyển hướng
            const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
                redirectUri
            )}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(
                state
            )}`;

            console.log("Generated Google Auth URL:", googleAuthUrl);
            return googleAuthUrl;
        } catch (error) {
            console.error("Lỗi khi tạo URL Google Auth:", error);
            throw new Error("Không thể tạo URL Google Auth");
        }
    },

    callbackGoogle: async ({ code, state, typeLogin = "google" }) => {
      try {
          const response = await axios.post(`${API_BASE_URL}/auth/google/callback`, {
              code,
              state, // Thêm state nếu cần kiểm tra tại backend
              typeLogin,
          });
          return response.data; // Trả về dữ liệu server gửi về (token, thông tin người dùng, ...)
      } catch (error) {
          console.error("Lỗi khi gửi mã code:", error.response?.data || error.message);
          throw new Error(error.response?.data?.message || "Không thể xử lý callback Google.");
      }
  },
  loginFacebook: async () => {
    try {
      // Thực hiện đăng nhập qua Facebook SDK
      FB.login(
        async (response) => {
          if (response.authResponse) {
            const { accessToken } = response.authResponse;
            
            // Gửi access token đến backend xử lý
            const serverResponse = await axios.post(`${API_BASE_URL}/auth/facebook/callback`, {
              accessToken,
            });
            return serverResponse.data;
          } else {
            console.log('Facebook login failed');
            throw new Error("Đăng nhập Facebook thất bại.");
          }
        },
        { scope: 'email' } // Cấu hình các quyền cần thiết
      );
    } catch (error) {
      console.error("Lỗi khi đăng nhập Facebook:", error);
      throw new Error("Không thể đăng nhập Facebook.");
    }
  }
  
};

export default AuthService;
  
