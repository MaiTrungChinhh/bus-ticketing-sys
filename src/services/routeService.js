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

const routeService = {
  // Lấy danh sách tuyến đường
  fetchRoutes: async () => {
    try {
      const response = await axiosInstance.get('/routes');
      return response.data.result;
    } catch (error) {
      console.error('Error fetching routes:', error);
      throw error;
    }
  },

  // Lấy chi tiết một tuyến đường theo ID
  fetchRouteById: async (id) => {
    try {
      const response = await axiosInstance.get(`/routes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching route by ID:', error);
      throw error;
    }
  },

  // Tạo mới một tuyến đường
  createRoute: async (tripData) => {
    try {
      const response = await axiosInstance.post('/routes', tripData);
      return response.data;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  },

  // Cập nhật toàn bộ một tuyến đường bằng PUT
  updateRoute: async (id, tripData) => {
    try {
      const response = await axiosInstance.put(`/routes/${id}`, tripData);
      return response.data;
    } catch (error) {
      console.error('Error updating route:', error);
      throw error;
    }
  },

  // Cập nhật một phần tuyến đường bằng PATCH
  patchRoute: async (id, patchData) => {
    try {
      const response = await axiosInstance.patch(`/routes/${id}`, patchData);
      return response.data;
    } catch (error) {
      console.error('Error patching route:', error);
      throw error;
    }
  },

  // Xóa một tuyến đường theo ID
  deleteRoute: async (tripId) => {
    try {
      await axiosInstance.delete(`/routes/${tripId}`);
    } catch (error) {
      console.error('Error deleting trip:', error);
      throw error;
    }
  },
};

export default routeService;
