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

export const fetchTripsInDate = async (date, departure, arrival) => {
  try {
    const url = '/tickets/buyTicket';
    const requestBody = {
      departureLocation: departure,
      arrivalLocation: arrival,
      departureDate: date,
    };

    const response = await axiosInstance.post(url, requestBody);
    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      console.error('Invalid response structure:', response.data);
      return [];
    }
  } catch (error) {
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

// Lấy thông tin chuyến đi theo ID
export const fetchTripById = async (tripId) => {
  try {
    const response = await axiosInstance.get(`/trips/${tripId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trip by ID:', error);
    throw error;
  }
};

export const tripUserById = async (tripId) => {
  try {
    const response = await axiosInstance.get(`/tickets/buyTicket/${tripId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Trip not found:', error.response.data.message);
      return { message: 'Chuyến đi không tồn tại.' }; // Hoặc bạn có thể trả về null
    } else {
      console.error('Error fetching trip by ID:', error);
      throw error;
    }
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
