import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash, FaRegCheckCircle, FaExclamationCircle } from "react-icons/fa";

function SignUp() {
  const [loginname, setLoginname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState<string>("password");
  const [error, setError] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showPopupPassword, setShowPopupPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  // Password validation 
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  // Handle password change and validation checks
  const handleChange = (value: string) => {
    setPassword(value);
    setShowPopupPassword(true);
    const lower = /(?=.*[a-z])/;
    const upper = /(?=.*[A-Z])/;
    const number = /(?=.*[0-9])/;
    const special = /(?=.*[!@#$%^&*])/;
    const length = /(?=.{8,})/;

    setLowerValidated(lower.test(value));
    setUpperValidated(upper.test(value));
    setNumberValidated(number.test(value));
    setSpecialValidated(special.test(value));
    setLengthValidated(length.test(value));
  };

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // check if the inputs feilds are empty
    if (!loginname || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // check if the password meets all constraints
    if (!lowerValidated || !upperValidated || !numberValidated || !specialValidated || !lengthValidated) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);//set the poup time
      }, 6000);
      return;
    }
    //register the new user
    try {
      await axios.post("http://localhost:8080/account/register", {
        loginname,
        email,
        password,
      });
      navigate("/signin");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          alert(error.response.data);
        } else {
          alert("Error: Unable to connect to the backend.");
        }
      } else {
        alert("An unexpected error occurred.");
      }
    }
  }

  return (
    <section className="container">
      <img className="imgback" src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background" />
      <div className="content">
        <div className="login">
          <p>Sign Up</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={save}>
            <label>
              Username:
              <input
                type="text"
                id="loginname"
                name="loginname"
                value={loginname}
                onChange={(event) => {
                  setLoginname(event.target.value);
                }}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </label>
            <label>Password:
              <div style={{ position: 'relative' }}>
                <input
                  type={type}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => handleChange(event.target.value)}
                />
                {type === 'password' ? (
                  <span
                    className='pass'
                    onClick={() => setType("text")}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                  >
                    <FaRegEyeSlash style={{ color: 'black' }} />
                  </span>
                ) : (
                  <span
                    className='pass'
                    onClick={() => setType("password")}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                  >
                    <FaRegEye style={{ color: 'black' }} />
                  </span>
                )}
                {/* Popup message for validation error */}
                {showPopup && (
                  <div className="popup-message" style={{
                    position: 'absolute',
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    border: '1px solid #f5c6cb',
                    padding: '10px',
                    borderRadius: '5px',
                    top: '100%', // Just below the input
                    left: 0,
                    width: '102%',
                    zIndex: 10,
                  }}>
                    <FaExclamationCircle style={{ marginRight: '8px' }} />
                    {'Please choose a stronger password.Try a mix of letters, numbers and symbols.'}
                  </div>
                )}
              </div>
            </label>


            {/* Password validation tracker */}
            {showPopupPassword && (
              <div className='tracker-box' ><i>
                <div className={lowerValidated ? 'validated' : 'not-validated'}>
                  {lowerValidated ? <FaRegCheckCircle /> : <FaExclamationCircle style={{ color: 'red' }} />} At least one lowercase letter
                </div>
                <div className={upperValidated ? 'validated' : 'not-validated'}>
                  {upperValidated ? <FaRegCheckCircle /> : <FaExclamationCircle style={{ color: 'red' }} />} At least one uppercase letter
                </div>
                <div className={numberValidated ? 'validated' : 'not-validated'}>
                  {numberValidated ? <FaRegCheckCircle /> : <FaExclamationCircle style={{ color: 'red' }} />} At least one number
                </div>
                <div className={specialValidated ? 'validated' : 'not-validated'}>
                  {specialValidated ? <FaRegCheckCircle /> : <FaExclamationCircle style={{ color: 'red' }} />} At least one special character
                </div>
                <div className={lengthValidated ? 'validated' : 'not-validated'}>
                  {lengthValidated ? <FaRegCheckCircle /> : <FaExclamationCircle style={{ color: 'red' }} />} At least 8 characters
                </div>
              </i>
              </div>)}

            <button type="submit" className="btn2">Sign Up</button>
            <div className="div2">
              <p>If you already have an account? <Link to="/signin" className="btnlogin2">Sign in</Link></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default SignUp;
