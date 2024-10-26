import React, { useState, useEffect } from 'react';

// Hàm fetch để lấy thông tin xe
const fetchVehicleDetails = async (vehicleId) => {
  const sampleData = {
    1: {
      vehicleId: 1,
      vehicleType: 'luxury',
      reservedSeats: [2, 4, 6, 8, 10],
      totalSeats: 35,
    },
    2: {
      vehicleId: 2,
      vehicleType: 'regular',
      reservedSeats: [1, 3, 5, 7, 9],
      totalSeats: 45,
    },
    3: {
      vehicleId: 3,
      vehicleType: 'limousine',
      reservedSeats: [0, 1, 2, 3, 4, 5],
      totalSeats: 25,
    },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (sampleData[vehicleId]) {
        resolve(sampleData[vehicleId]);
      } else {
        reject(new Error('Vehicle not found'));
      }
    }, 1000);
  });
};

const ChooseChair = ({ selectedSeats, onSeatSelect, vehicleId }) => {
  const [vehicleType, setVehicleType] = useState('');
  const [reservedSeats, setReservedSeats] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);

  // Hàm để lấy thông tin xe
  useEffect(() => {
    const getVehicleDetails = async () => {
      try {
        const data = await fetchVehicleDetails(vehicleId);
        setVehicleType(data.vehicleType);
        setReservedSeats(data.reservedSeats);
        setTotalSeats(data.totalSeats);
      } catch (error) {
        console.error('Có vấn đề khi lấy thông tin xe:', error);
      }
    };

    getVehicleDetails();
  }, [vehicleId]);

  // Hàm kiểm tra ghế có hợp lệ không
  const isSeatValid = (currentSeatNumber) => {
    return currentSeatNumber < totalSeats;
  };

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
    switch (vehicleType) {
      case 'regular':
        return renderRegularSeats();
      case 'luxury':
        return renderLuxurySeats();
      case 'limousine':
        return renderLimousineSeats();
      default:
        return null;
    }
  };

  // Hàm để render ghế cho xe thường
  const renderRegularSeats = () => (
    <div className="grid grid-cols-6 gap-4">
      {Array.from({ length: totalSeats }).map((_, index) => (
        <div
          key={index}
          className={`seat regular h-16 w-16 flex items-center justify-center border-2 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
            selectedSeats.includes(index)
              ? 'bg-blue-500 text-white'
              : reservedSeats.includes(index)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-white text-black'
          }`}
          onClick={() => {
            if (!reservedSeats.includes(index)) {
              toggleSeatSelection(index); // Chọn ghế
            }
          }}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );

  // Hàm để render ghế cho xe VIP
  const renderLuxurySeats = () => {
    const seatsPerRow = 6; // Số ghế trong mỗi hàng
    const numberOfRows = Math.ceil(totalSeats / seatsPerRow); // Tính số hàng

    return (
      <div className="space-y-4">
        {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-x-4">
            {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
              const seatLetter = String.fromCharCode(
                65 + Math.floor(seatIndex / 2)
              );
              const seatNumber = (seatIndex % 2) + 1 + rowIndex * 2;
              const currentSeatNumber = rowIndex * seatsPerRow + seatIndex;
              const seatId = `${seatLetter}${seatNumber}`;

              if (!isSeatValid(currentSeatNumber)) {
                return null;
              }

              return (
                <div
                  key={seatId}
                  className={`seat vip h-16 w-20 flex items-center justify-center border-2 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                    selectedSeats.includes(seatId)
                      ? 'bg-blue-500 text-white'
                      : reservedSeats.includes(currentSeatNumber)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-white text-black'
                  }`}
                  onClick={() => {
                    if (!reservedSeats.includes(currentSeatNumber)) {
                      toggleSeatSelection(seatId);
                    }
                  }}
                >
                  {seatId}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // Hàm để render ghế cho xe limousine
  const renderLimousineSeats = () => (
    <div className="grid grid-cols-4 gap-4">
      <div className="text-lg font-semibold">Tổng số ghế: {totalSeats}</div>
      {Array.from({ length: totalSeats }).map((_, index) => (
        <div
          key={index}
          className={`seat limousine h-16 w-16 flex items-center justify-center border-2 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
            selectedSeats.includes(index)
              ? 'bg-blue-500 text-white'
              : reservedSeats.includes(index)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-white text-black'
          }`}
          onClick={() => {
            if (!reservedSeats.includes(index)) {
              toggleSeatSelection(index); // Chọn ghế
            }
          }}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-center mb-4">Chọn ghế</h2>
      <div className="seat-selection">{renderSeats()}</div>
    </div>
  );
};

export default ChooseChair;
