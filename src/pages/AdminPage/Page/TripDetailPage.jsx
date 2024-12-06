import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DefaultComponent from '../../../components/Admin/DefaultComponent/DefaultComponent';
import ChooseChair from '../../../components/DetailTicket/ChooseChair';
import TripInfo from '../../../components/DetailTicket/FormTripInformation';
import { tripUserById } from '../../../services/tripService';
import { lockSeats, unlockSeats } from '../../../services/seatService';
import { fetchTicketsByTripId } from '../../../services/ticketService';
import ContentBookingTicket from '../../../components/Admin/ComponentPage/BookingTicketPage/ContentBookingTicket';

const TripDetailPage = () => {
  const [bookings, setBookings] = useState([]);
  const [totalResults, setTotalTickets] = useState(0);
  const { id } = useParams();
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [guestInfo, setGuestInfo] = useState({});
  const [tripDetails, setTripDetails] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [departurePoint, setDeparturePoint] = useState('');
  const [refreshChooseChair, setRefreshChooseChair] = useState(false);

  const fetchData = async () => {
    try {
      const data = await tripUserById(id);
      //   const response = await fetchTicketsByTripId(tripId);
      //   if (response.code === 200 && Array.isArray(response.result)) {
      //     setBookings(response.result);
      //     setTotalTickets(response.result.length);
      //   } else {
      //     setBookings([]);
      //     setTotalTickets(0);
      //   }
      if (data?.result) {
        const { vehicleId, ticketPrice, route } = data.result;
        setVehicleId(vehicleId);
        setTicketPrice(ticketPrice);
        setDeparturePoint(route.departurePoint);
        setTripDetails(data.result);
      } else {
        console.error('Unexpected response format:', data);
        setTripDetails(null);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const processTicketsData = async () => {
    try {
      const response = await fetchTicketsByTripId(id);
      if (response.code === 200 && Array.isArray(response.result)) {
        setBookings(response.result);
        setTotalTickets(response.result.length);
      } else {
        setBookings([]);
        setTotalTickets(0);
      }
    } catch (error) {
      console.error('Error fetching tickets by trip ID:', error);
      setBookings([]);
      setTotalTickets(0);
    }
  };

  useEffect(() => {
    fetchData();
    processTicketsData();
  }, [id]);

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
      window.location.reload();
      return false;
    }
  };

  return (
    <DefaultComponent title="Detail Trips">
      <ContentBookingTicket bookings={bookings} totalResults={totalResults} />
      <div className="m-20 flex flex-col">
        <div className="flex flex-col md:flex-row gap-6 text-lg md:text-2xl justify-around">
          <ChooseChair
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelection}
            vehicleId={vehicleId}
            key={refreshChooseChair}
          />
          <TripInfo tripDetails={tripDetails} />
        </div>
      </div>
    </DefaultComponent>
  );
};

export default TripDetailPage;
