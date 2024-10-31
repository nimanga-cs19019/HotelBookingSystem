import { useEffect, useState } from 'react';
import Nav from './Nav';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";

//BookingRoom interface
interface BookingRoom {
    id: number;
    roomType: string;
    checkInDate: Date;
    checkOutDate: Date;
    numRooms: number;
    totalBalance: number; 
    status:string;
    room_id:number;
}
//User interface
interface User {
    email: string;
    loginname: string;
}
function Payments() {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    const [bookings, setBookings] = useState<BookingRoom | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedBooking, setSelectedBooking] = useState<BookingRoom | null>(null);
    const stripe = useStripe(); // Stripe instance for handling payments
    const elements = useElements(); // Used to get the CardElement input
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            // Retrieve the JWT token from localStorage
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setErrorMessage('No token found, user is not authenticated');
                return;
            }

            // Fetch user profile
            const profileResponse = await fetch('http://localhost:8080/account/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!profileResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const profileData = await profileResponse.json();
            const userData = profileData.User;
            setUser(userData);// Set the user state

        } catch (error) {
            setErrorMessage((error as Error).message);
        }

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setErrorMessage('No token found, user is not authenticated');
                return;
            }
            // Fetch latest booking for user
            const response2 = await axios.get<BookingRoom>('http://localhost:8080/bookingRoom/latest', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBookings(response2.data);// Set booking data

        } catch (error) {
            setErrorMessage('Error fetching data: ' + (error as Error).message);
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData
    }, []);

    // Handle payment process
    const handlePayment = async () => {
        if (!selectedBooking) return;// No booking selected

        const token2 = localStorage.getItem('jwtToken');
        if (!token2) {
            setErrorMessage('No token found, user is not authenticated');
            return;
        }
        const amount = (selectedBooking.totalBalance) * 100 * 320;
        const paymentRequest = {
            amount,
            email: user?.email,
        };

        try {
            // Create Payment Intent
            const response = await fetch('http://localhost:8080/api/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token2}`
                },
                body: JSON.stringify(paymentRequest),
            });

            if (!response.ok) throw new Error('Failed to create payment intent');
            const { clientSecret } = await response.json();

            // Confirm payment with Stripe
            if (!stripe || !elements) return;

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) throw new Error('CardElement not found');

            setLoading(true);// Show loading during payment processing 
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (result.error) {
                setErrorMessage(result.error.message || 'Unknown payment error');
            } else {
                // Payment successful
                if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                    alert('Payment Successful!');
                     // Update booking status to 'succeeded'
                      await axios.put(
                    `http://localhost:8080/bookingRoom/${selectedBooking.id}/status`,
                    { status: 'succeeded' },
                    { headers: { 'Authorization': `Bearer ${token2}` } }
                );
                    navigate("/ongoing")
                    setSelectedBooking(null);
                }
            }
        } catch (error) {
            setErrorMessage('Payment Error: ' + (error as Error).message);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    return (
        <section className="container">
            <img className="imgback" src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background" />
            <div className="content">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <Nav />
                <section className='paybox'>
                <h2><i>Your Booking......</i></h2>
                    <div className='pay'>
                        <p><FaCheck style={{ marginRight: '8px' }}/>Room Type:<span style={{ marginLeft: '10px' }}>{bookings?.roomType}</span></p>
                        <p><FaCheck style={{ marginRight: '8px' }}/>Check-in Date:<span style={{ marginLeft: '10px' }}>{bookings?.checkInDate ? new Date(bookings.checkInDate).toLocaleDateString() : 'N/A'}</span></p>
                        <p><FaCheck style={{ marginRight: '8px' }}/>Check-out Date:<span style={{ marginLeft: '10px' }}>{bookings?.checkOutDate ? new Date(bookings.checkOutDate).toLocaleDateString() : 'N/A'}</span></p>
                        <p><FaCheck style={{ marginRight: '8px' }}/>Number of Rooms:<span style={{ marginLeft: '10px' }}>{bookings?.numRooms}</span></p>
                        <p><FaCheck style={{ marginRight: '8px' }}/>Total Balance:<span style={{ marginLeft: '10px' }}>${bookings?.totalBalance}</span></p>
                        <p><button
                            className="btn btn-primary"
                            onClick={() => setSelectedBooking(bookings)}
                            disabled={loading}
                        >
                            PAY
                        </button></p>
                        {selectedBooking && (
                            <div>
                                <h3>Payment for {selectedBooking.roomType}</h3>
                                <div className='cardElement'><CardElement /></div>
                                <button className="btn btn-primary"
                                    disabled={!stripe || loading}
                                    onClick={handlePayment}
                                >
                                    {loading ? 'Processing...' : 'Confirm Payment'}
                                </button>
                            </div>
                        )}
                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </div>

                </section>
            </div>
        </section>
    );
}
export default Payments;
