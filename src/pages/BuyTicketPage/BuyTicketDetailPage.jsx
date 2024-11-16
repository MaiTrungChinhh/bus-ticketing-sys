import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StepProgress from '../../components/StepProgress/StepProgress';
import FormGuestInformation from '../../components/DetailTicket/FormGuestInformation';
import ChooseChair from '../../components/DetailTicket/ChooseChair';
import TripInfo from '../../components/DetailTicket/FormTripInformation';
import { TbRippleOff } from 'react-icons/tb';
import { tripUserById, fetchTripById } from '../../services/tripService';
import { lockSeats } from '../../services/seatService';

const BuyTicketDetailPage = () => {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [guestInfo, setGuestInfo] = useState({});
  const [tripDetails, setTripDetails] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [departurePoint, setDeparturePoint] = useState('');

  const breadcrumbItems = [
    { label: 'Trang nhất', link: '/', className: 'text-2xl' },
    { label: 'Mua vé online', link: '/muave', className: 'text-2xl' },
    { label: 'Chọn chuyến', className: 'text-2xl' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await tripUserById(id);

        // Kiểm tra dữ liệu trả về
        if (data?.result) {
          const { vehicleId, ticketPrice, route } = data.result;
          setVehicleId(vehicleId);
          setTicketPrice(ticketPrice);
          setDeparturePoint(route.departurePoint);
          setTripDetails(data.result); // Lưu tripDetails vào state
        } else {
          console.error('Unexpected response format:', data);
          setTripDetails(null); // Đảm bảo khi dữ liệu không hợp lệ sẽ không tiếp tục
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchData();
  }, [id]); // Phụ thuộc vào `id` để gọi lại API khi `id` thay đổi

  const handleSeatSelection = (seatNumber, seatId, seatPosition) => {
    setSelectedSeats((prevSeats) => {
      // Kiểm tra xem ghế đã được chọn chưa
      const newSelectedSeats = prevSeats.includes(seatNumber)
        ? prevSeats.filter((s) => s !== seatNumber) // Bỏ chọn ghế
        : [...prevSeats, seatNumber]; // Chọn ghế

      setSelectedSeatIds((prevIds) => {
        const newSelectedSeatIds = prevIds.includes(seatId)
          ? prevIds.filter((id) => id !== seatId) // Nếu ghế đã chọn thì bỏ chọn
          : [...prevIds, seatId]; // Nếu chưa chọn thì thêm vào
        return newSelectedSeatIds;
      });
      return newSelectedSeats;
    });
  };

  const handleGuestInfoChange = (info) => {
    setGuestInfo(info);
  };

  const handleContinueClick = (e) => {
    e.preventDefault();
    console.log('Thông tin ghế đã chọn (ID ghế):', selectedSeatIds);
    selectedSeatIds.forEach((seatId) => {
      lockSeats(seatId);
    });
  };

  return (
    <DefaultComponent>
      <div className="mx-20 flex flex-col">
        <Breadcrumb items={breadcrumbItems} />
        <StepProgress currentStep={1} />
        <div className="flex flex-col md:flex-row gap-6 text-lg md:text-2xl justify-center">
          {/* Truyền selectedSeats và handleGuestInfoChange vào FormGuestInformation */}
          <FormGuestInformation
            selectedSeats={selectedSeats}
            onGuestInfoChange={handleGuestInfoChange}
            tripDetails={tripDetails}
            onContinue={handleContinueClick}
          />

          {/* Truyền selectedSeats và handleSeatSelection vào ChooseChair */}
          <ChooseChair
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelection}
            vehicleId={vehicleId}
          />

          {/* Hiển thị thông tin chuyến nếu có */}
          <TripInfo tripDetails={tripDetails} />
        </div>
      </div>
    </DefaultComponent>
  );
};

export default BuyTicketDetailPage;
