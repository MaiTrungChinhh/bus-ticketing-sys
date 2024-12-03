import axiosInstance from './Axios';

// Lấy danh sách các chuyến đi
export const fetchTrips = async (page, pageSize) => {
  try {
    // Gọi API với tham số phân trang
    const response = await axiosInstance.get('/trips', {
      params: {
        page: page, // Trang hiện tại
        pageSize: pageSize, // Số lượng kết quả trên mỗi trang
      },
    });
    return response.data.result; // Trả về dữ liệu kết quả từ API
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error; // Ném lỗi nếu có
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
    throw error;
  }
};

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

export const fetchAssignmentTrips = async (page, pageSize) => {
  try {
    const response = await axiosInstance.get('/driverAssignmentsForTrips', {
      params: {
        page: page, // Trang hiện tại
        pageSize: pageSize, // Số lượng kết quả trên mỗi trang
      },
    });
    return response.data.result; // Trả về dữ liệu kết quả từ API
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error; // Ném lỗi nếu có
  }
};

export const fetchTripsunassigned = async () => {
  try {
    const response = await axiosInstance.get(`/trips/unassigned`);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};

export const fetchAssignmentVehicles = async (page, pageSize) => {
  try {
    const response = await axiosInstance.get('/driverAssignmentsForVehicles', {
      params: {
        page: page, // Trang hiện tại
        pageSize: pageSize, // Số lượng kết quả trên mỗi trang
      },
    });
    return response.data.result; // Trả về dữ liệu kết quả từ API
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error; // Ném lỗi nếu có
  }
};

export const createAssignmentTrip = async (tripId, employeeId) => {
  try {
    const { data } = await axiosInstance.post('/driverAssignmentsForTrips', {
      tripId,
      employeeId,
    });
    return data;
  } catch (error) {
    console.error('Error creating trip assignment:', error);
    throw error;
  }
};

export const updateTrip = async (tripId, tripData) => {
  try {
    const response = await axiosInstance.put(`/trips/${tripId}`, tripData);
    return response.data;
  } catch (error) {
    console.error('Error updating trip:', error);
    throw error;
  }
};

export const fetchDrivers = async () => {
  try {
    const response = await axiosInstance.get('/employees/drivers');
    return response.data.result;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw error;
  }
};

export const fetchVehiclesUnassigned = async () => {
  try {
    const response = await axiosInstance.get(`/vehicles/unassigned`);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};

export const createAssignmentVehicle = async (assignmentData) => {
  try {
    const response = await axiosInstance.post('/driverAssignmentsForVehicles', {
      startDate: assignmentData.startDate,
      endDate: assignmentData.endDate,
      vehicleId: assignmentData.vehicleId,
      employeeId: assignmentData.driverId,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating trip assignment:', error);
    throw error;
  }
};
