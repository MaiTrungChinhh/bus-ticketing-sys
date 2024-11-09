import React, { useState, useEffect } from 'react';
import { getSeatByVehicleId } from '../../services/seatService';

// Hàm lấy thông tin xe từ API
export const fetchVehicleDetails = async (vehicleId) => {
  try {
    const response = await getSeatByVehicleId(vehicleId);
    const seats = response.result;

    if (seats.length > 0) {
      const vehicleInfo = seats[0].vehicle;
      return {
        vehicleType: vehicleInfo.vehicleName,
        reservedSeats: seats
          .filter((seat) => seat.status !== 'AVAILABLE')
          .map((seat) => seat.position),
        totalSeats: vehicleInfo.seatCount,
      };
    }
    return {
      vehicleType: '',
      reservedSeats: [],
      totalSeats: 0,
    };
  } catch (error) {
    console.error('Có lỗi khi lấy thông tin xe:', error);
    return null;
  }
};

const ChooseChair = ({ selectedSeats, onSeatSelect, vehicleId }) => {
  const [vehicleType, setVehicleType] = useState('');
  const [reservedSeats, setReservedSeats] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);

  // Hàm gọi API khi `vehicleId` thay đổi
  useEffect(() => {
    const getVehicleDetails = async () => {
      try {
        const data = await fetchVehicleDetails(vehicleId);
        if (data) {
          setVehicleType(data.vehicleType);
          setReservedSeats(data.reservedSeats);
          setTotalSeats(data.totalSeats);
        }
      } catch (error) {
        console.error('Có vấn đề khi lấy thông tin xe:', error);
      }
    };

    getVehicleDetails();
  }, [vehicleId]);

  // Hàm kiểm tra ghế có hợp lệ không
  const isSeatValid = (currentSeatNumber) => currentSeatNumber < totalSeats;

  // Hàm để chọn hoặc hủy chọn ghế
  const toggleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      onSeatSelect(seat); // Bỏ chọn ghế
    } else if (selectedSeats.length < 4) {
      onSeatSelect(seat); // Chọn ghế nếu chưa đủ 4 ghế
    } else {
      alert('Bạn chỉ có thể chọn tối đa 4 ghế!'); // Thông báo cho người dùng
    }
  };

  // Hàm để render ghế dựa trên loại xe
  const renderSeats = () => {
    switch (vehicleType.toLowerCase()) {
      case 'xe 45 chỗ':
        return renderRegularSeats();
      case 'xe limousine':
        return renderLimousineSeats();
      default:
        return renderRegularSeats();
    }
  };

  // Hàm render ghế xe thường
  const renderRegularSeats = () => (
    <div className="space-y-4">
      {/* Ô "Tài xế" nằm phía trên dãy ghế */}
      <div className="flex justify-between mb-4">
        <div className="seat driver h-16 w-32 flex items-center justify-center border-2 rounded-lg bg-gray-400 text-white font-bold">
          Tài xế
        </div>
        <div className="seat driver h-16 w-32 flex items-center justify-center border-2 rounded-lg bg-gray-400 text-white font-bold">
          Cửa
        </div>
      </div>

      {/* Dãy ghế phía dưới ô "Tài xế" với khoảng cách tùy chỉnh */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: '1fr 2fr 1fr 2fr 1fr 1fr',
        }}
      >
        {Array.from({ length: totalSeats }).map((_, index) => {
          const seatNumber = index + 1;

          return (
            <div
              key={index}
              className={`seat regular h-16 w-16 flex items-center justify-center border-2 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                selectedSeats.includes(seatNumber)
                  ? 'bg-blue-500 text-white'
                  : reservedSeats.includes(seatNumber.toString())
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-black'
              }`}
              onClick={() => {
                if (!reservedSeats.includes(seatNumber.toString())) {
                  toggleSeatSelection(seatNumber);
                }
              }}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>
    </div>
  );

  // Hàm render ghế xe limousine
  const renderLimousineSeats = () => (
    <div className="space-y-4">
      {/* Ô "Tài xế" và "Cửa" nằm phía trên dãy ghế */}
      <div className="flex justify-between mb-4">
        <div className="seat driver h-16 w-32 flex items-center justify-center border-2 rounded-lg bg-gray-400 text-white font-bold">
          Tài xế
        </div>
        <div className="seat driver h-16 w-32 flex items-center justify-center border-2 rounded-lg bg-gray-400 text-white font-bold">
          Cửa
        </div>
      </div>

      {/* Dãy ghế với khoảng cách tùy chỉnh */}
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: totalSeats }).map((_, index) => {
          const seatNumber = index + 1;

          return (
            <>
              {/* Thêm khoảng trống sau ghế ở cột 2 */}
              {index % 4 === 2 && (
                <div className=" "></div> // Tạo khoảng cách bằng một div rỗng
              )}
              <div
                key={index}
                className={`seat regular h-16 w-24 flex items-center justify-center border-2 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                  selectedSeats.includes(seatNumber)
                    ? 'bg-blue-500 text-white'
                    : reservedSeats.includes(seatNumber.toString())
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-black'
                }`}
                onClick={() => {
                  if (!reservedSeats.includes(seatNumber.toString())) {
                    toggleSeatSelection(seatNumber);
                  }
                }}
              >
                {seatNumber}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl text-blue-600 uppercase font-bold text-center mb-4 ">
        Chọn ghế
      </h2>
      <div className="seat-selection">{renderSeats()}</div>
    </div>
  );
};

export default ChooseChair;
