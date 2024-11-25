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

export const lockSeats = async (seatId) => {
  try {
    const lockDuration = 5;
    const response = await axiosInstance.post('/seats/lock', {
      seatId,
      lockDuration,
    });
    return response.data;
  } catch (error) {
    console.error('Error locking seats:', error);
    throw error;
  }
};

export const unlockSeats = async (seatId) => {
  try {
    const response = await axiosInstance.patch(`/seats/${seatId}`, {
      status: 'AVAILABLE',
    });
    return response.data;
  } catch (error) {
    console.error('Error unlocking seats:', error);
    throw error;
  }
};

export const lockSeatsPayment = async (seatId) => {
  try {
    const response = await axiosInstance.patch(`/seats/${seatId}`, {
      status: 'OCCUPIED',
    });
    return response.data;
  } catch (error) {
    console.error('Error unlocking seats:', error);
    throw error;
  }
};
