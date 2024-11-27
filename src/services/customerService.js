import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token không tồn tại hoặc đã hết hạn.');
  }
  return token;
};

const customerService = {
  fetchCustomers: async () => {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/customers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.result;
  },
  createCustomer: async (customerData) => {
    const token = getToken();
    const response = await axios.post(`${API_BASE_URL}/customers`, customerData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteCustomer: async (customerId) => {
    const token = getToken();
    await axios.delete(`${API_BASE_URL}/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  patchCustomer: async (customerId, data) => {
    const token = getToken();
    const response = await axios.patch(`${API_BASE_URL}/customers/${customerId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  putCustomer: async (customerId, data) => {
    const token = getToken();
    const response = await axios.put(`${API_BASE_URL}/customers/${customerId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default customerService;
