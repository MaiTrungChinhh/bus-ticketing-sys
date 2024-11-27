import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/paymentMethods'; // Đường dẫn API chính

const paymentMethodService = {
    // Lấy danh sách phương thức thanh toán
    fetchPaymentMethods: async () => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data.result.contents; // Trả về danh sách phương thức thanh toán
        } catch (error) {
            console.error('Lỗi khi lấy danh sách phương thức thanh toán:', error);
            throw error;
        }
    },
    fetchPaymentMethodById: async (id) => {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data; // Trả về dữ liệu phương thức
    },

    fetchRolesFromAccounts: async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(ACCOUNT_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const accounts = response.data.result.contents;
        const extractedRoles = accounts.flatMap((account) => account.roles);
        return [...new Set(extractedRoles)]; // Trả về danh sách roles duy nhất
    },
    // Lấy danh sách roles từ API accounts
    fetchRolesFromAccounts: async () => {
        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            const response = await axios.get(ACCOUNT_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Lấy dữ liệu accounts
            const accounts = response.data.result.contents;

            // Trích xuất các roles và lọc duy nhất
            const extractedRoles = accounts.flatMap((account) => account.roles);
            const uniqueRoles = [...new Set(extractedRoles)];

            return uniqueRoles; // Trả về danh sách roles duy nhất
        } catch (error) {
            console.error('Lỗi khi lấy danh sách roles:', error);
            throw error; // Quăng lỗi để xử lý tại component
        }
    },
    // Tạo mới phương thức thanh toán
    createPaymentMethod: async (data) => {
        try {
            const response = await axios.post(BASE_URL, data);
            return response.data; // Trả về dữ liệu đã được tạo
        } catch (error) {
            console.error('Lỗi khi tạo phương thức thanh toán:', error);
            throw error;
        }
    },
    updateRolesOnly: async (id, data) => {
        await axios.patch(`${BASE_URL}/${id}`, data); // API PATCH
    },
    // Cập nhật phương thức thanh toán
    updatePaymentMethod: async (id, data) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, data);
            return response.data; // Trả về dữ liệu đã được cập nhật
        } catch (error) {
            console.error('Lỗi khi cập nhật phương thức thanh toán:', error);
            throw error;
        }
    },

    // Xóa phương thức thanh toán
    deletePaymentMethod: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
        } catch (error) {
            console.error('Lỗi khi xóa phương thức thanh toán:', error);
            throw error;
        }
    },
};

export default paymentMethodService;
