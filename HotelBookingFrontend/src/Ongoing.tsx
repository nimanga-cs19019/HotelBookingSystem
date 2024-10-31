import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';

// Room interface
interface BookingRoomDto{
    id: number;
    roomType: string;
    checkInDate: Date;
    checkOutDate: Date;
    numRooms: number;
    totalBalance: number;
    status: string;
    cancellationDate: Date;
}
function Ongoing() {
    const [bookings, setBookings] = useState<BookingRoomDto[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [selectedBooking, setSelectedBooking] = useState<BookingRoomDto | null>(null);
    const [showCancelModel, setShowCancelModel] = useState<boolean>(false); // for popup cancelation
    const navigate = useNavigate();

    const fetchData = async () => {
        /*try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.log('No token found, user is not authenticated');
                return;
            }
            // Fetch the user's profile data from the backend
            const profileResponse = await fetch('http://localhost:8080/account/profile', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!profileResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const profileData = await profileResponse.json();
            const userData = profileData.User;
            setUser(userData);
        } catch (error) {
            console.log(error);
        }*/

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.log('No token found, user is not authenticated');
                return;
            }
            //Get all booking details for the authenticated user
            const bookingsResponse = await fetch('http://localhost:8080/bookingRoom/fetch', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!bookingsResponse.ok) throw new Error('Failed to fetch bookings');
            const bookingsData = await bookingsResponse.json();
            setBookings(bookingsData);
        } catch {
            setErrorMessage('Error fetching data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCancelPayment = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.log('No token found, user is not authenticated');
                return;
            }
            // Update booking status to 'canceled'
            await axios.put(
                `http://localhost:8080/bookingRoom/${selectedBooking?.id}/status`,
                { status: 'Canceled' },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            setShowCancelModel(false);
            navigate("/ongoing"); // navigate back
        } catch {
            setErrorMessage('Failed to cancel booking');
        }

        if (selectedBooking?.status == 'Canceled')
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    console.log('No token found, user is not authenticated');
                    return;
                }

            } catch {
                setErrorMessage('An error occurred while checking room availability.');
                return false;
            }
    };
    const openCancelModel = (booking: BookingRoomDto) => {
        setSelectedBooking(booking);
        setShowCancelModel(true); // Show the cancel policy popup
    };

    return (
        <section className="container">
            <img className="imgback" src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background" />
            <div className="content">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <Nav />
                <section>
                    <h2 style={{ color: 'beige' }}>Ongoing Bookings</h2>
                    <article className="scroller">
                        <section className="room">
                            {bookings.length === 0 ? (
                                <p>No ongoing bookings</p>
                            ) : (
                                <div className="table-container">
                                    <table>
                                        <thead style={{ position: 'sticky', top: '0', backgroundColor: 'black' }}>
                                            <tr>
                                                <th>Room Type</th>
                                                <th>Check-in Date</th>
                                                <th>Check-out Date</th>
                                                <th>Number of Rooms</th>
                                                <th>Total Balance</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking) => (
                                                <tr key={booking.id}>
                                                    <td>{booking.roomType}</td>
                                                    <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                                    <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                                                    <td>{booking.numRooms}</td>
                                                    <td>${booking.totalBalance}</td>
                                                    <td>
                                                        {booking.status === 'succeeded' ? (
                                                            <span style={{ color: 'beige' }}>Confirmed</span>
                                                        ) : (
                                                            <span style={{ color: 'red' }}><i>Canceled</i>
                                                                <p>{new Date(booking.cancellationDate).toLocaleString()}</p>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {booking.status === 'succeeded' && (
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={() => openCancelModel(booking)}
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </article>
                    {errorMessage && <p className="error">{errorMessage}</p>}

                    {/* Modal for cancel policy */}
                    {showCancelModel && (
                        <div className="model">
                            <div className="model-content">
                                <h3>Hotel Room Booking Cancellation Policy</h3>
                                <li>Cancellations made 24 hours or more prior to the check-in date will be fully refunded.If not  a cancellation fee equivalent to the first night's stay will be charged.</li>
                                <li>If a cancellation is made within 24 hours of the check-in date, a cancellation fee equivalent to the first night's stay will be charged.</li>
                                <li>If the guest does not show up on the day of the booking and does not cancel the reservation, the entire booking amount will be charged.</li>
                                <li>If a guest checks out earlier than the confirmed departure date, the remaining nights will still be charged.</li>
                                <br></br>
                                <p>Are you sure you want to cancel this booking? This action cannot be undone.</p>
                                <button className="btn btn-primary" onClick={() => setShowCancelModel(false)}>
                                    Close
                                </button>
                                <button className="btn btn-primary" onClick={handleCancelPayment}>
                                    OK
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </section>
    );
}

export default Ongoing;
