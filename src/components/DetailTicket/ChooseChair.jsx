import React, { useState, useEffect } from 'react';

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

const SeatSelection = ({ vehicleId }) => {
  const [vehicleType, setVehicleType] = useState('');
  const [reservedSeats, setReservedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [totalSeats, setTotalSeats] = useState(0);

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

  const renderSeats = () => {
    switch (vehicleType) {
      case 'regular':
        return (
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: totalSeats }).map((_, index) => (
              <div
                key={index}
                className={`seat regular h-16 w-16 flex items-center justify-center border-2 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                  selectedSeat === index
                    ? 'bg-blue-500 text-white'
                    : reservedSeats.includes(index)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-black'
                }`}
                onClick={() => {
                  if (!reservedSeats.includes(index)) {
                    setSelectedSeat(index);
                  }
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        );

      case 'luxury':
        const seatsPerRow = 6; // Số ghế trong mỗi hàng
        const numberOfRows = Math.ceil(totalSeats / seatsPerRow); // Tính số hàng dựa trên tổng số ghế

        return (
          <div className="space-y-4">
            {/* Tạo các hàng ghế cho xe VIP */}
            {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-x-4">
                {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                  const seatLetter = String.fromCharCode(
                    65 + Math.floor(seatIndex / 2)
                  ); // Chuyển đổi chỉ số ghế thành chữ cái
                  const seatNumber = (seatIndex % 2) + 1 + rowIndex * 2; // Tính số ghế theo định dạng A1, A2, B1, B2

                  const currentSeatNumber =
                    rowIndex * seatsPerRow + seatIndex + 1; // Tính số ghế hiện tại

                  if (currentSeatNumber > totalSeats) return null; // Bỏ qua ghế nếu vượt quá tổng ghế

                  return (
                    <div
                      key={`${seatLetter}${seatNumber}`}
                      className={`seat vip h-16 w-16 flex items-center justify-center border-2 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                        selectedSeat === `${seatLetter}${seatNumber}` // So sánh ghế đã chọn
                          ? 'bg-blue-500 text-white'
                          : reservedSeats.includes(currentSeatNumber)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-white text-black'
                      }`}
                      onClick={() => {
                        if (!reservedSeats.includes(currentSeatNumber)) {
                          setSelectedSeat(`${seatLetter}${seatNumber}`); // Đặt ghế đã chọn
                        }
                      }}
                    >
                      {`${seatLetter}${seatNumber}`}{' '}
                      {/* Hiển thị số ghế với định dạng A1, A2, B1, B2 */}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );

      case 'limousine':
        return (
          <div className="grid grid-cols-4 gap-4">
            <div className="text-lg font-semibold">
              Tổng số ghế: {totalSeats}
            </div>
            {Array.from({ length: totalSeats }).map((_, index) => (
              <div
                key={index}
                className={`seat limousine h-16 w-16 flex items-center justify-center border-2 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                  selectedSeat === index
                    ? 'bg-blue-500 text-white'
                    : reservedSeats.includes(index)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-black'
                }`}
                onClick={() => {
                  if (!reservedSeats.includes(index)) {
                    setSelectedSeat(index);
                  }
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-center mb-4">Chọn ghế</h2>
      <div className="seat-selection">{renderSeats()}</div>
    </div>
  );
};

export default SeatSelection;
