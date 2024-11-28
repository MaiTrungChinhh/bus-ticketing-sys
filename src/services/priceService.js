import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token không tồn tại hoặc đã hết hạn.');
  }
  return token;
};

const priceService = {
  fetchRoutes: async () => {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/routes`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    // Đảm bảo trả về một mảng
    return Array.isArray(response.data.result.contents) ? response.data.result.contents : [];
},


fetchVehicleTypes: async () => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/vehicleTypes`, {
      headers: { Authorization: `Bearer ${token}` },
  });

  // Xử lý dữ liệu trả về để đảm bảo luôn là một mảng
  return Array.isArray(response.data.result.contents) ? response.data.result.contents : [];
},

  fetchPrices: async () => {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/prices`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.result?.contents || [];
  },
  createPrice: async (payload) => {
    const token = getToken();
    const response = await axios.post(`${API_BASE_URL}/prices`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  updatePrice: async (priceId, payload) => {
    const token = getToken();
    await axios.put(`${API_BASE_URL}/prices/${priceId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
    });
},
  deletePrice: async (priceId) => {
    const token = getToken();
    await axios.delete(`${API_BASE_URL}/prices/${priceId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default priceService;
