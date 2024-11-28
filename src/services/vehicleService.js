import axios from 'axios';

export const fetchVehicles = async () => {
  try {
    const response = await axiosInstance.get('/vehicles');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
const API_BASE_URL = 'http://localhost:8080/api';

const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token không tồn tại hoặc đã hết hạn.');
    }
    return token;
};

const vehicleService = {
    fetchVehicles: async () => {
        const token = getToken();
        const response = await axios.get(`${API_BASE_URL}/vehicles`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.result.contents || [];
    },
    fetchInactiveVehicles: async () => {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}/vehicles`, {
          headers: { Authorization: `Bearer ${token}` },
      });
      const vehicles = response.data.result.contents || [];
      return vehicles.filter(
          (vehicle) =>
              vehicle.status === 'OUT_OF_SERVICE'
      );
  }, 
  fetchVehicleTypes: async () => {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}/vehicleTypes`, {
          headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.result.contents || [];
  },

  addVehicleType: async (vehicleTypeName) => {
      const token = getToken();
      const response = await axios.post(
          `${API_BASE_URL}/vehicleTypes`,
          { vehicleTypeName },
          {
              headers: { Authorization: `Bearer ${token}` },
          }
      );
      return response.data;
  },
    
    addVehicle: async (vehicleData) => {
        const token = getToken();
        const response = await axios.post(`${API_BASE_URL}/vehicles`, vehicleData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },
    addVehicleType: async (vehicleTypeName) => {
      const token = getToken();
      const response = await axios.post(
          `${API_BASE_URL}/vehicleTypes`,
          { vehicleTypeName },
          {
              headers: { Authorization: `Bearer ${token}` },
          }
      );
      return response.data;
  },
    updateVehicle: async (vehicleId, payload) => {
      const token = getToken();
      const response = await axios.put(`${API_BASE_URL}/vehicles/${vehicleId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
  },
    updateVehicleStatus: async (vehicleId, status) => {
        const token = getToken();
        await axios.patch(
            `${API_BASE_URL}/vehicles/${vehicleId}`,
            { status },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    },
    updateVehicleType: async (id, data) => {
        const token = getToken();
        const response = await axios.put(`${API_BASE_URL}/vehicleTypes/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },
   
deleteVehicle: async (vehicleId) => {
      const token = getToken();
      await axios.delete(`${API_BASE_URL}/vehicles/${vehicleId}`, {
          headers: { Authorization: `Bearer ${token}` },
      });
  },
  deleteVehicleType: async (vehicleTypeId) => {
      const token = getToken();
      await axios.delete(`${API_BASE_URL}/vehicleTypes/${vehicleTypeId}`, {
          headers: { Authorization: `Bearer ${token}` },
      });
  },
};

export default vehicleService;
