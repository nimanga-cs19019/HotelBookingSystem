import Nav from './Nav';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaRegHandPointRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function ContactUs() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  // Handle inquire submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //construct a new message
    const newMessage = { email, message };
    try {
      // Send the POST request to backend API for saving message
      await axios.post('http://localhost:8080/message/save', newMessage);
      alert('Submit Successfull!');
      setEmail('');
      setMessage('');

    } catch{
      alert('Failed to add the message.');
    }
  };
  return (
    <section className="container">
      <img className="imgback" src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background image" />
      <div className="content">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <Nav />
        <section className="contactform">
          {/*inquire form*/}
          <form>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="name@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="mb-3">
              <textarea className="form-control" placeholder="type your message here" value={message}
                onChange={(e) => setMessage(e.target.value)}
                required />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </form>
        </section>
        <section className="contact">
          <h1>GET IN TOUCH</h1>
          <p><i>Got a question or require special accommadations?</i></p>
          <p><i>Fill out the form on your right and we'll get back to you as soon as possible...<FaRegHandPointRight /></i></p>
          <div className='address'>
            <p><FaMapMarkerAlt className='iconlist' /><Link to="https://maps.app.goo.gl/UEV8yetmMwzaCEfE8" className='mapcontact'>77 Lotus Rd,Colombo 00300,Sri Lanka</Link></p>
            <p><FaPhoneAlt className='iconlist' /><Link to="tel:+94012191008" className='mapcontact'>(+94)11 -2544 544</Link></p>
            <p><FaEnvelope className='iconlist' /><Link to="mailto:pivindi.psd@gmail.com" className='mapcontact'>info@dreamhotel.lk</Link></p>
          </div>
        </section>
      </div>
    </section>
  )
}
export default ContactUs
