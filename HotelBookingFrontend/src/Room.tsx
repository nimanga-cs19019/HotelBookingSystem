import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';

// Room interface
interface Room {
  id: number; 
  roomType: string;
  length: string;
  description: string;
  features: string[];
  rentpernight: number;
  image: string;
  quantity: number;
}

function Room() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [email] = useState<string>(''); // getting logged-in user's data
  const [numRooms, setNumRooms] = useState<number>(1);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [availableRooms, setAvailableRooms] = useState<number | null>(null)
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
          // Fetch all rooms
        const response = await axios.get<Room[]>('http://localhost:8080/api/rooms/fetch');
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchData();
  }, []);

  // Handle "Book Now" button click
  const handleBookNowClick = (room: Room) => {
    setSelectedRoom(room);
    setShowBookingForm(true); 
  };

  // Close the booking form
  const closeBookingForm = () => {
    setShowBookingForm(false);
    setCheckInDate('');
    setCheckOutDate('');
    setNumRooms(1);
    setTotalBalance(0);
    setSuccessMessage('');
    setErrorMessage('');
  };

  {/*const checkRoomAvailability = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setErrorMessage('User not authenticated');
      return false;
    }
  
    const bookingRoomData = {
      roomType: selectedRoom?.roomType,
      room_id: selectedRoom?.id,
      checkInDate,
      checkOutDate,
      numRooms,
      totalBalance,
      email,
    };
  
    try {
      const response = await fetch('http://localhost:8080/bookingRoom/check-availability', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingRoomData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data);

        return true; // Room is available
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Room not available');
        return false; // Room is not available
      }
    } catch{
      setErrorMessage('An error occurred while checking room availability.');
      return false;
    }
  };*/}
  const checkRoomAvailability = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setErrorMessage('User not authenticated');
      return false;
    }
  
    if (!selectedRoom || !checkInDate || !checkOutDate) {
      setErrorMessage('Please provide all booking details.');
      return false;
    }
  
    // Construct the bookingRoomData
    const bookingData = {
      room_id: selectedRoom.id,
      checkInDate,
      checkOutDate,
    };
  
    try {
      const response = await axios.post(
        'http://localhost:8080/bookingRoom/check-availability',
        bookingData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const availableCount = response.data.availableRooms;
        setAvailableRooms(availableCount);
        return true;
      } else {
        setErrorMessage(response.data.message || 'Room not available');
        return false;
      }
    } catch{
      setErrorMessage('An error occurred while checking room availability.');
      return false;
    }
  };
  

  useEffect(() => {
    if (selectedRoom && checkInDate && checkOutDate) {
      checkRoomAvailability();
      calculateTotalBalance();
    }
  });

  
  // Handle booking submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (!token) return setErrorMessage('User not authenticated');
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Construct the booking data
   const bookingRoomData = {
      roomType: selectedRoom?.roomType,
      room_id: selectedRoom?.id,
      checkInDate,
      checkOutDate,
      numRooms,
      totalBalance,
      availableRooms,
      email,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/bookingRoom/save',
        bookingRoomData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Booking successful!");
        alert("Booking Successful");
        navigate("/payments");
    }else {
        setErrorMessage('Booking unsuccessful, please try again.');
      }
      // Reset after successful booking
      closeBookingForm();
    } catch (error) {
      setErrorMessage('An error occurred while booking: ' + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total balance
  const calculateTotalBalance = () => {
    if (selectedRoom) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff > 0) {
        setTotalBalance(daysDiff * numRooms * selectedRoom.rentpernight);
      } else {
        setTotalBalance(0);
        setErrorMessage('Check-out date must be after check-in date.');
      }
    }
  };

  return (
    <section className="container">
      <img className="imgback" src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background" />
      <div className="content">
        <Nav />
        <p className="home">Welcome to <span>DreamHotel</span></p>
        <article className="scroller">
          <section className="room">
            <div className="room-list">
              {/*Room List*/}
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <div className="box" key={room.id}>
                    <section className="content3">
                      <h2>{room.roomType}</h2>
                      <h3>{room.length}</h3>
                      <p>{room.description}</p>
                      <ul>
                        {room.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                      <p className="price">
                        <i>For One Night:</i>
                        <span>${room.rentpernight}</span>
                      </p>
                     
                    </section>
                    <section className="content4">
                      {room.image ? (
                        <img src={room.image} alt={room.roomType} />
                      ) : (
                        <p>No image URL provided yet.</p>
                      )}
                    </section>
                    <section className="content5">
                      <button className="btn5" onClick={() => handleBookNowClick(room)}>BOOK NOW</button>
                    </section>

                    {/* Booking form popup */}
                    {showBookingForm && (
                      <div className="booking-form-overlay">
                        <div className="booking-form">
                          <h3>Complete Your Booking</h3>
                          <div>
                          <label>{selectedRoom?.roomType} {selectedRoom?.id}</label>
                          </div>
                          <div>
                           
                            <label>Check-in Date:</label>
                            <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                          </div>
                          <div>
                            <label>Check-out Date:</label>
                            <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                          </div>
                          {availableRooms !== null && checkInDate && checkOutDate &&(
              <p>{availableRooms > 0 ? `Rooms Available: ${availableRooms}` : 'No rooms available'}</p>
            )}
                          <div>
                            <label>Number of Rooms:</label>
                            <input type="number" value={numRooms} onChange={(e) => setNumRooms(Math.max(1, parseInt(e.target.value)))} min="1" />
                          </div>
                          {totalBalance > 0 && (
                            <div>
                              <h4>Total Balance: ${totalBalance}</h4>
                            </div>
                          )}
                          <button className="close-btn" onClick={handleBookingSubmit}>Book Now</button>
                          <button className="close-btn" onClick={closeBookingForm}>Close</button>
                          {errorMessage && <p className="error">{errorMessage}</p>}
                          {successMessage && <p className="success">{successMessage}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No rooms available</p>
              )}
            </div>
          </section>
        </article>
      </div>
    </section>
  );
}
export default Room;

