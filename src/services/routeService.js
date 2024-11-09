import axiosInstance from './Axios';

export const fetchRoutes = async () => {
  try {
    const response = await axiosInstance.get('/routes');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }
};

export const fetchRouteById = async (tripId) => {
  try {
    const response = await axiosInstance.get(`/routes/${tripId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trip by ID:', error);
    throw error;
  }
};

export const createRoute = async (tripData) => {
  try {
    const response = await axiosInstance.post('/routes', tripData);
    return response.data;
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};

export const deleteRoute = async (tripId) => {
  try {
    await axiosInstance.delete(`/routes/${tripId}`);
  } catch (error) {
    console.error('Error deleting trip:', error);
    throw error;
  }
};
