import axiosInstance from './Axios';

export const fetchVehicles = async () => {
  try {
    const response = await axiosInstance.get('/vehicles');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

export const fetchVehicleById = async (vehicleId) => {
  try {
    const response = await axiosInstance.get(`/vehicles/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle by ID:', error);
    throw error;
  }
};

export const createVehicle = async (vehicleData) => {
  try {
    const response = await axiosInstance.post('/vehicles', vehicleData);
    return response.data;
  } catch (error) {
    console.error('Error creating vehicle:', error);
    throw error;
  }
};

export const deleteVehicle = async (vehicleId) => {
  try {
    await axiosInstance.delete(`/vehicles/${vehicleId}`);
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
};
