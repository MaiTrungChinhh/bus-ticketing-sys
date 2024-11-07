import axiosInstance from './Axios';

export const getSeatByVehicleId = async (vehicaleId) => {
  try {
    const response = await axiosInstance.get(`/seats/${vehicaleId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trip by ID:', error);
    throw error;
  }
};
