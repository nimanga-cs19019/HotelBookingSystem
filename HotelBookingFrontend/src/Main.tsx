import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; // Import Stripe.js
import Home from './components/Home';
import './index.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import About from './About';
import LocateUs from './LocateUs';
import Admin from './AdminComponent/Admin';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // This is essential for the dropdown to work
import Room from './Room';
import AddRoom from './AdminComponent/Room/AddRoom';
import DeleteRoom from './AdminComponent/Room/DeleteRoom';
import UpdateRoom from './AdminComponent/Room/UpdateRoom';
import ContactUs from './ContactUs';
import AddOffer from './AdminComponent/Offer/AddOffer';
import Offer from './Offer';
import UpdateOffer from './AdminComponent/Offer/UpdateOffer';
import RemoveOffer from './AdminComponent/Offer/RemoveOffer';
import Review from './Review';
import Message from './AdminComponent/Message/Message';
import ForgotPassword from './ForgotPassword';
import Ongoing from './Ongoing';
import Payments from './Payments';
import BookingRooms from './AdminComponent/BookingRoom/BookingRooms';

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51Q5MUaRo9T6KBCY0BJl03iTcjM1Ag6OAVK36700njQbCWhfXWIdbCFBfznzCv0epvrZHTjduyv2qBYPuBp0YOuLm00d29O5gAE');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Elements stripe={stripePromise}> {/* Wrap the Router with Elements */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/room" element={<Room />} />
          <Route path="/aboutUs" element={<About />} />
          <Route path="/locateUs" element={<LocateUs />} />
          <Route path="/ongoing" element={<Ongoing/>} />
          <Route path="/payments" element={<Payments/>} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/review" element={<Review/>} />
          <Route path="/messages" element={<Message />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          {/*Admin*/}
          <Route path="/admin" element={<Admin />} />
          <Route path="/addRoom" element={<AddRoom />} />
          <Route path="/updateRoom" element={<UpdateRoom />} />
          <Route path="/deleteRoom" element={<DeleteRoom />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/addOffer" element={<AddOffer />} />
          <Route path="/updateOffer" element={<UpdateOffer />} />
          <Route path="/removeOffer" element={<RemoveOffer />} />
          <Route path="/bookings" element={<BookingRooms/>} />

        </Routes>
      </Router>
    </Elements> {/* Close Elements provider */}
  </StrictMode>
);
