import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash, FaRegCheckCircle, FaExclamationCircle } from "react-icons/fa";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [copytoken, setCopyToken] = useState(''); // Token to reset password
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [type, setType] = useState('password');
    const [typenew, setTypeNew] = useState('password');
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupPassword, setShowPopupPassword] = useState<boolean>(false);
    const navigate = useNavigate();


    // Password validation 
    const [lowerValidated, setLowerValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [numberValidated, setNumberValidated] = useState(false);
    const [specialValidated, setSpecialValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);

    //Handle password change and validation checks
    const handleChange = (value: string) => {
        setNewPassword(value);
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

    //handle confirm password
    const handleChangeComfirmed = (value: string) => {
        setConfirmPassword(value);
    }

    // Handle for requesting reset submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Request for the forgot-password endpoint
            const response = await axios.post('http://localhost:8080/account/forgot-password', { email });
            setCopyToken(response.data.resetTokenResponse); // Set the reset token
            setIsSubmitted(true);
        } catch {
            setError('An error occurred while requesting password reset.');
        }
    };

    // Handle for reset submission
    const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Password validation
        if (!lowerValidated || !upperValidated || !numberValidated || !specialValidated || !lengthValidated) {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false); // Hide popup after 5s
            }, 6000);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Request for the reset-password endpoint
            const response = await axios.post('http://localhost:8080/account/reset-password', {
                token: copytoken,
                newPassword,
            });
            setMessage(response.data); // Set success message from the server
        } catch {
            setError('An error occurred during password reset.');
        }
    };

    const clearForm = () => {
        const lower = /(?=.*[a-z])/;
        const upper = /(?=.*[A-Z])/;
        const number = /(?=.*[0-9])/;
        const special = /(?=.*[!@#$%^&*])/;
        const length = /(?=.{8,})/;
        setError('');
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setLowerValidated(lower.test(''));
        setUpperValidated(upper.test(''));
        setNumberValidated(number.test(''));
        setSpecialValidated(special.test(''));
        setLengthValidated(length.test(''));
    };
    const handleCloseForm = () => {
        navigate("/signin");
    }

    return (
        <div>
            <section className="container">
                <img className="imgback" src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background" />
                <div className="content">
                    <div className="login">
                    {/* Form submission is handled by the handleSubmit function */}
                        {!isSubmitted && (
                            <form onSubmit={handleSubmit} style={{ paddingTop: '' }}>
                                <p style={{ paddingTop: '100px' }}>Reset your password</p>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                                <button type="submit" className='btn2'>Submit</button>
                            </form>
                        )}

                         {/* Form submission is handled by the handlereset function */}
                        {copytoken && (
                            <form onSubmit={handleReset}>
                                <p style={{ paddingTop: '10px', fontSize: '100%' }}>Reset your password</p>
                                <label>Your token:
                                    <input
                                        type="text"
                                        value={copytoken}
                                        readOnly
                                    />
                                </label>
                                <label>New Password:
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={type}
                                            id="password"
                                            name="password"
                                            value={newPassword}
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
                                            <div className="popup-message"
                                                style={{
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
                                                }}
                                            >
                                                <FaExclamationCircle style={{ marginRight: '8px' }} />
                                                {'Please choose a stronger password. Try a mix of letters, numbers and symbols.'}
                                            </div>
                                        )}
                                    </div>

                                </label>

                                {/* Password validation tracker */}
                                {showPopupPassword && (
                                    <div className='tracker-box' style={{ fontSize: '12px' }}>
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
                                    </div>)}

                                <label>Confirm Password:
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={typenew}
                                            id="comfirmedPassword"
                                            name="comfiredPassword"
                                            value={confirmPassword}
                                            onChange={(event) => handleChangeComfirmed(event.target.value)}
                                        />
                                        {typenew === 'password' ? (
                                            <span
                                                className='pass'
                                                onClick={() => setTypeNew("text")}
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
                                                onClick={() => setTypeNew("password")}
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

                                    </div>
                                </label>
                                <div className="row" style={{ marginLeft: '0px', width: '25%' }}>
                                    <div className='col'><button className="btn2" type="submit" style={{ fontSize: '15px', fontWeight: 'normal', marginTop: '0rem', marginBottom: '0rem' }}>Reset</button></div>
                                    <div className='col'><button className="btn2" onClick={handleCloseForm} style={{ fontSize: '15px', fontWeight: 'normal', marginTop: '0rem', marginBottom: '0rem' }}>Close</button></div>
                                </div>
                            </form>
                        )}

                    </div>
                    {message && <p style={{ color: 'beige' }}>{message}....<Link to="/signin">Sign in</Link></p>}
                    {error && <p style={{ color: 'red' }}>{error}...<button className="errorbtn" onClick={clearForm}>OK</button></p>}
                </div>
            </section>
        </div>
    );
}

export default ForgotPassword;
