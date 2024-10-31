import { Link } from 'react-router-dom';
import './admin.css'; // Your custom CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // This is essential for the dropdown to work
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaUser } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
interface User {
  email: string;
  loginname: string;
  loginid: string;
  password: string;
}
function Admin() {
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
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove token from localStorage or sessionStorage
    localStorage.removeItem('token');  // or sessionStorage.removeItem('token')
    // Redirect the user to the login page
    navigate('/signin');
  };

  return (
    <section className="continer2">
      {user ? (
           <div className='loginname'><FaUser/>{user.email}
           < FaSignOutAlt className="icon" onClick={handleLogout}/>
           </div>
          ) : (
            <p>Loading user data...</p>
          )}
      <div className='adminrow'>
        {/*Room Management*/}
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            Room Management</button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li className="dropdown-item"><Link to="/addRoom">Add Room</Link></li>
            <li className="dropdown-item" ><Link to="/updateRoom">Update Room</Link></li>
            <li className="dropdown-item" ><Link to="/deleteRoom">Remove Room</Link></li>
          </ul>
        </div>
        {/*Offer Management*/}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Offer Management
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li className="dropdown-item"><Link to="/addOffer">Add Offer</Link></li>
            <li className="dropdown-item"><Link to="/updateOffer">Update Offer</Link></li>
            <li className="dropdown-item"><Link to="/removeOffer">Remove Offer</Link></li>
          </ul>
        </div>
        {/*Inquries Management*/}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Inquries
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li className="dropdown-item"><Link to="/messages">Messages</Link></li>
          </ul>
        </div>
        {/*Booking Room Management*/}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
           Booking Room Management
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li className="dropdown-item"><Link to="/bookings">Bookings</Link></li>
          </ul>
        </div>
      </div>
    </section>


  );
};

export default Admin;
