import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaInfo, FaMapMarkerAlt, FaPhoneAlt, FaFileSignature, FaPercentage, FaRegCalendarCheck } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';
// Define the User interface
interface User {
  email: string;
  loginname: string;
  loginid: string;
  password: string;
}
function Nav() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.log('No token found, user is not authenticated');
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
        console.log('Profile Data:', profileData);

        const userData = profileData.User;

        setUser(userData);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); // Call the async function inside useEffect
  }, []);

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const Popup = () => setShowPopup(!showPopup);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage 
    localStorage.removeItem('token'); 

    // Redirect the user to the login page
    navigate('/signin');
  };

  return (
    <div>
      {user ? (
        <div className='loginname'><FaUser />{user.email}
          <FaSignOutAlt className="icon" onClick={handleLogout} />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      {/* Button to show popup */}
      <div className="btn3" onClick={Popup}>
        <FaBars />
      </div>
      {/* Popup section */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <ul>
              <li><FaInfo className='iconlist' /><Link to="/aboutUs" className="btn4">About Us</Link></li>
              <li><FaPercentage className='iconlist' /><Link to="/offer" className="btn4">Offer</Link></li>
              <li><FaPhoneAlt className='iconlist' /><Link to="/contactUs" className="btn4">Contact Us</Link></li>
              <li><FaMapMarkerAlt className='iconlist' /><Link to="/locateUs" className="btn4">Locate Us</Link></li>
              <li><FaFileSignature className='iconlist' /><Link to="/review" className="btn4">Reviews</Link></li>
              <li><FaRegCalendarCheck className='iconlist' /><Link to="/ongoing" className="btn4">Your Booking</Link></li>
              <Link to="/room" className="btn4">Home</Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Nav
