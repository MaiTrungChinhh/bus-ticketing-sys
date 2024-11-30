import axiosInstance from './Axios';

export const getTotalTicketsByType = async (type) => {
  try {
    const response = await axiosInstance.get(
      `/statistics/totalTickets?type=${type}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching ticket statistics for type: ${type}`, error);
    throw error;
  }
};

export const getCountRevenue = async (type) => {
  try {
    const response = await axiosInstance.get(
      `/statistics/countRevenue?type=${type}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching ticket statistics for type: ${type}`, error);
    throw error;
  }
};
