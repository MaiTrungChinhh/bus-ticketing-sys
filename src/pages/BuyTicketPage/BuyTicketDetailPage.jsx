import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StepProgress from '../../components/StepProgress/StepProgress';
import FormGuestInformation from '../../components/DetailTicket/FormGuestInformation';
import ChooseChair from '../../components/DetailTicket/ChooseChair';
import TripInfo from '../../components/DetailTicket/FormTripInformation';
import { TbRippleOff } from 'react-icons/tb';

// Giả sử đây là hàm fetch thông tin chuyến
const fetchTripDetails = async (tripId) => {
  const sampleTripData = {
    1: {
      id: 1,
      destination: 'Hà Nội',
      departureTime: '2024-10-25T10:00:00',
      duration: '5h',
    },
    2: {
      id: 2,
      destination: 'Đà Nẵng',
      departureTime: '2024-10-25T12:00:00',
      duration: '10h',
    },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (sampleTripData[tripId]) {
        resolve(sampleTripData[tripId]);
      } else {
        reject(new Error('Trip not found'));
      }
    }, 1000);
  });
};

const BuyTicketDetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [selectedSeats, setSelectedSeats] = useState([]); // State quản lý ghế đã chọn
  const [guestInfo, setGuestInfo] = useState({}); // State quản lý thông tin khách hàng
  const [tripDetails, setTripDetails] = useState(null); // State quản lý thông tin chuyến

  const breadcrumbItems = [
    { label: 'Trang nhất', link: '/' },
    { label: 'Mua vé online', link: '/muave' },
    { label: 'Chọn chuyến' },
  ];

  // Gọi API để lấy thông tin chuyến
  useEffect(() => {
    const getTripDetails = async () => {
      try {
        const tripData = await fetchTripDetails(id);
        setTripDetails(tripData);
      } catch (error) {
        console.error('Có vấn đề khi lấy thông tin chuyến:', error);
      }
    };

    getTripDetails();
  }, [id]);

  // Hàm để chọn hoặc bỏ chọn ghế
  const handleSeatSelection = (seat) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  // Hàm để cập nhật thông tin khách hàng
  const handleGuestInfoChange = (info) => {
    setGuestInfo(info);
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
          />

          {/* Truyền selectedSeats và handleSeatSelection vào ChooseChair */}
          <ChooseChair
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelection}
            vehicleId="1"
          />

          {/* Hiển thị thông tin chuyến nếu có */}
        <TripInfo tripDetails={tripDetails} />
        </div>
      </div>
    </DefaultComponent>
  );
};

export default BuyTicketDetailPage;
