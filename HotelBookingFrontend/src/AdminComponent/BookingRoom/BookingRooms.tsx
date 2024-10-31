import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//BookingRoom interface
interface BookingRoomDto {
    id: number;
    roomType: string;
    checkInDate: Date;
    checkOutDate: Date;
    numRooms: number;
    totalBalance: number;
    status: string;
    cancellationDate: Date;
    user:number;
    loginId:number;
    customerId:string;
}
function BookingRooms() {
    const [bookings, setBookings] = useState<BookingRoomDto[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate=useNavigate();
    const fetchData = async () => {
            try {
                const data = (await axios.get<BookingRoomDto[]>('http://localhost:8080/bookingRoom/fetchAll')).data;
                setBookings(data);
            } catch {
                setErrorMessage('Error fetching data');
            }
    };

    useEffect(() => {
        fetchData();
    }, []);
   
    const closeForm =()=>
    {
        navigate("/admin");
    }
    return (
                <section>
                    <h2 style={{ color: 'beige',margin:'10px' }}>Bookings Details</h2>
                    <article className="scroller" style={{ marginLeft: '5%',width:'90%'}}>
                        <section className="room">
                            {bookings.length === 0 ? (
                                <p>No ongoing bookings</p>
                            ) : (
                                <div className="table-container">
                                    {/*all user table*/}
                                    <table>
                                        <thead style={{ position: 'sticky', top: '0',backgroundColor:'black',padding:'1%' }}>
                                            <tr>
                                                <th>ID</th>
                                                <th>Cus:ID</th>
                                                <th>Login:ID</th>
                                                <th>Room Type</th>
                                                <th>Check-in Date</th>
                                                <th>Check-out Date</th>
                                                <th>No.Rooms</th>
                                                <th>Total Balance</th>
                                                <th>Confimination Status</th>
                                               
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking) => (
                                                <tr key={booking.id}>
                                                    <td>{booking.id}</td>
                                                    <td>{booking.customerId}</td>
                                                    <td>{booking.loginId}</td>
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
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>   
                    </article>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <div className="row">
                    <div className='col' style={{marginLeft:'8%',marginTop:'30px'}}><button className="btn btn-primary" onClick={closeForm}>CLSOE</button></div>
                </div>
                </section>
    );
}
export default BookingRooms;
