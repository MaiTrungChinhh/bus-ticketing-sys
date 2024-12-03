import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token không tồn tại hoặc đã hết hạn.');
  }
  return token;
};

const employeeService = {
  fetchEmployees: async () => {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/employees`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.result;
  },

  fetchEmployeeTypes: async () => {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/employeeTypes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.result;
  },
  fetchEmployeesById: async (id) => {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/employees/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Trả về dữ liệu nhân viên
  },
  addEmployee: async (data) => {
    const token = getToken();
    const response = await axios.post(`${API_BASE_URL}/employees`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.result;
  },
  updateEmployee: async (id, data) => {
    const token = getToken();
    await axios.put(`${API_BASE_URL}/employees/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  addEmployeeType: async (data) => {
    const token = getToken();
    const response = await axios.post(`${API_BASE_URL}/employeeTypes`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  updateEmployeeType: async (id, data) => {
    const token = getToken();
    const response = await axios.put(
      `${API_BASE_URL}/employeeTypes/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  deleteEmployeeType: async (id) => {
    const token = getToken();
    await axios.delete(`${API_BASE_URL}/employeeTypes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteEmployee: async (employeeId) => {
    const token = getToken();
    await axios.delete(`${API_BASE_URL}/employees/${employeeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteAccount: async (accountId) => {
    const token = getToken();
    await axios.delete(`${API_BASE_URL}/accounts/${accountId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default employeeService;
