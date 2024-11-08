import axiosInstance from './Axios';

// Lấy danh sách các chuyến đi
export const fetchTrips = async () => {
  try {
    const response = await axiosInstance.get('/trips');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};


export const createTrip = async (tripData) => {
  try {
    const response = await axiosInstance.post('/trips', tripData);
    return response.data;
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};


export const deleteTrip = async (tripId) => {
  try {
    await axiosInstance.delete(`/trips/${tripId}`);
  } catch (error) {
    console.error('Error deleting trip:', error);
    throw error;
  }
};
