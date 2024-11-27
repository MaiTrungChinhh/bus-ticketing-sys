import axiosInstance from './Axios';

export const fetchRoutes = async () => {
  let allRoutes = [];
  let page = 1;
  let pageSize = 10;
  let totalPages = 1;

  try {
    do {
      const response = await axiosInstance.get('/routes', {
        params: {
          page: page,
          pageSize: pageSize,
        },
      });

      const data = response.data;
      if (data.result && data.result.contents) {
        allRoutes = [...allRoutes, ...data.result.contents];
        totalPages = data.result.totalPages;
        page += 1;
      }
    } while (page <= totalPages);

    return allRoutes;
  } catch (error) {
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
