import axiosInstance from './Axios';

export const CreateTicket = async (ticketData) => {
  try {
    const response = await axiosInstance.post('/tickets', ticketData);
    console.log('Ticket created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

export const TicketLookup = async (ticketData) => {
  try {
    const response = await axiosInstance.post('/tickets/lookup', ticketData);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

export const fetchTickets = async (page, pageSize) => {
  try {
    const response = await axiosInstance.get('/tickets', {
      params: {
        page,
        pageSize,
      },
    });
    console.log('Tickets fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const fetchTicketsByTripId = async (tripId) => {
  try {
    const response = await axiosInstance.get(`/tickets/trip/${tripId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Trip not found:', error.response.data.message);
      return { message: 'Chuyến đi không tồn tại.' }; // Trả về thông báo nếu chuyến đi không tồn tại
    } else {
      console.error('Error fetching tickets by trip ID:', error);
      throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
  }
};
