import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StepProgress from '../../components/StepProgress/StepProgress';
import FormGuestInformation from '../../components/DetailTicket/FormGuestInformation';
import ChooseChair from '../../components/DetailTicket/ChooseChair';
import TripInfo from '../../components/DetailTicket/FormTripInformation';
import { TbRippleOff } from 'react-icons/tb';
import { tripUserById } from '../../services/tripService';

const BuyTicketDetailPage = () => {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [guestInfo, setGuestInfo] = useState({});
  const [tripDetails, setTripDetails] = useState(null);

  const breadcrumbItems = [
    { label: 'Trang nhất', link: '/' },
    { label: 'Mua vé online', link: '/muave' },
    { label: 'Chọn chuyến' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await tripUserById(id);
        // Check if data.result exists and is an object (based on your API response)
        if (data?.result) {
          setTripDetails(data.result); // Store the result directly
        } else {
          console.error('Unexpected response format:', data);
          setTripDetails(null); // Set to null if the structure is not as expected
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchData();
  }, [id]); // Adding id as a dependency to fetch data if the id changes

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
