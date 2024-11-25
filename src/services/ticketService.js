import axiosInstance from './Axios';

export const CreateTicket = async (ticketData) => {
  try {
    const response = await axiosInstance.post('/tickets', ticketData);
    console.log('Ticket created successfully:', response.data);
    return response.data; // Trả về dữ liệu phản hồi từ API nếu cần sử dụng sau
  } catch (error) {
    console.error('Error creating ticket:', error);
    alert('Lỗi khi tạo vé, vui lòng thử lại!');
    throw error; // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi hàm
  }
};
