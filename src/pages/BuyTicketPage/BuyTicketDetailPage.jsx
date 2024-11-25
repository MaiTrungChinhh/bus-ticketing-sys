import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StepProgress from '../../components/StepProgress/StepProgress';
import FormGuestInformation from '../../components/DetailTicket/FormGuestInformation';
import ChooseChair from '../../components/DetailTicket/ChooseChair';
import TripInfo from '../../components/DetailTicket/FormTripInformation';
import PaymentSuccess from '../../components/Notification/PaymentSuccess';
import { tripUserById } from '../../services/tripService';
import { lockSeats, unlockSeats } from '../../services/seatService';

const BuyTicketDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [guestInfo, setGuestInfo] = useState({});
  const [tripDetails, setTripDetails] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [departurePoint, setDeparturePoint] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [refreshChooseChair, setRefreshChooseChair] = useState(false);

  const breadcrumbItems = [
    { label: 'Trang nhất', link: '/', className: 'text-2xl' },
    { label: 'Mua vé online', link: '/muave', className: 'text-2xl' },
    { label: 'Chọn chuyến', className: 'text-2xl' },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search); // Lấy các tham số truy vấn từ URL
    if (queryParams.toString()) {
      // Nếu có tham số truy vấn
      setShowPaymentSuccess(true); // Hiển thị PaymentSuccess
    }
  }, [location]); // Khi URL thay đổi, useEffect sẽ chạy lại

  const fetchData = async () => {
    try {
      const data = await tripUserById(id);
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

  useEffect(() => {
    fetchData();
  }, [id]); // Phụ thuộc vào `id` để gọi lại API khi `id` thay đổi

  const handleSeatSelection = (seatNumber, seatId, seatPosition) => {
    setSelectedSeats((prevSeats) => {
      const newSelectedSeats = prevSeats.includes(seatNumber)
        ? prevSeats.filter((s) => s !== seatNumber)
        : [...prevSeats, seatNumber];
      setSelectedSeatIds((prevIds) => {
        const newSelectedSeatIds = prevIds.includes(seatId)
          ? prevIds.filter((id) => id !== seatId)
          : [...prevIds, seatId];
        return newSelectedSeatIds;
      });
      return newSelectedSeats;
    });
  };

  const handleGuestInfoChange = (info) => {
    setGuestInfo(info);
  };

  const handleContinueClick = async (e) => {
    e.preventDefault();

    localStorage.removeItem('lockedSeats');
    const lockedSeatIds = [];
    const failedSeatIds = [];
    try {
      await Promise.all(
        selectedSeatIds.map(async (seatId) => {
          try {
            await lockSeats(seatId);
            lockedSeatIds.push(seatId);
          } catch {
            failedSeatIds.push(seatId);
          }
        })
      );

      if (lockedSeatIds.length !== selectedSeatIds.length) {
        await Promise.all(
          lockedSeatIds.map(async (seatId) => {
            try {
              await unlockSeats(seatId);
            } catch {}
          })
        );
        Swal.fire({
          icon: 'error',
          title: 'Đặt ghế thất bại!',
          text: 'Ghế đã được đặt!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33',
        });
        setRefreshChooseChair((prev) => !prev);
        setSelectedSeats([]);
        return false;
      } else {
        localStorage.setItem('lockedSeats', JSON.stringify(lockedSeatIds));
        return true;
      }
    } catch {
      alert('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
      window.location.reload();
      return false;
    }
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
            key={refreshChooseChair}
          />

          {/* Hiển thị thông tin chuyến nếu có */}
          <TripInfo tripDetails={tripDetails} />
        </div>
      </div>

      {/* Hiển thị PaymentSuccess nếu tham số URL có */}
      {showPaymentSuccess && <PaymentSuccess />}
    </DefaultComponent>
  );
};

export default BuyTicketDetailPage;
