import { useState } from 'react';
import { Link } from 'react-router-dom';

const Booking = () => {
  // State to control the visibility of the popup
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // Function to toggle the popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <section className="container">
      {/* Background image */}
      <img src="https://wallpaperaccess.com/full/2690563.jpg" alt="Background" />
      <div className="content">
        {/* Font Awesome stylesheet */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        
        {/* Button to show popup */}
        <div className="btn3" onClick={togglePopup}>
          <i className="fa fa-bars"></i>
        </div>
        
        {/* Popup section */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <ul>
                <li><i className="fa fa-info-circle"></i>About Us</li>
                <li><i className="fa fa-percent"></i>Offers</li>
                <li><i className="fa fa-phone"></i>Contact Us</li>
                <li><i className="fa fa-map-marker"></i>Locate Us</li>
                <li><i className="fa fa-pencil-square-o"></i>Reviews</li>
                <li><i className="fa fa-calendar-check-o"></i>Your Booking</li>
                <Link to="/booking" className="btn4">Home</Link>
              </ul>
            </div>
          </div>
        )}

        {/* Main content */}
        <p className="home">Welcome to <span>DreamHotel</span></p>
        <article className="scroller">
        <section className="room">
        <section className="content3">
       <div className="box">
        <h2>Standard Double Room</h2>
       <h3>23ft / 2 Guests</h3>
       <p>
       The Standard rooms at the Hotel Sri Lanka are the perfect
choice for a comfortable and elegant stay, for either business
or pleasure.
       </p>
       <ul>
         <li>Lunch Dinner Included </li>
         <li>Free Wi-Fi </li>
         <li>40 Inch Tv</li>
         <li>Complimentary Toiletries</li>
         <li>Stereo System With Cd And Usb Port</li>
         <p className="price">$25</p>
       </ul>
       </div>
       </section>
      <section className="content3">
      <img src="https://pratapsignature.com/wp-content/uploads/2018/09/Standard-3.jpg" alt=""></img>
      <p>For One Night.....</p>
      <Link to="/login" className="btn5">BOOK NOW</Link>
      </section>
        </section>
        </article>
      </div>
    </section>
  );
};

export default Booking;
