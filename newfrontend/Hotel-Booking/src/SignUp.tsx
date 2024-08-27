// SignUp.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from './assets/Images/google.png';
import FacebookIcon from './assets/Images/facebook.png';
import MicroIcon from './assets/Images/microsoft.png';
import axios from 'axios';

const SignUp  = () => {
  // State hooks to manage input values
  const [loginname, setLoginname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  //Function to handle form submission for registration
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
       // Make a POST request to the backend API to register a new user
      await axios.post("http://localhost:8080/api/v1/login/SignUp", {
        loginname: loginname,
        email: email,
        password: password,
      });
      alert("Registration Successfully");
      navigate("/signin");// Redirect user to the SignIn page after registration
      
    } catch (err: unknown) {
        if (err instanceof Error) {
          alert(err.message);// Show specific error message if err is an Error class
        } else {
          alert("An unknown error occurred");// Fallback for unknown error types
        }
    }
  }

  return (
    <section className="container">
       {/* Background image for styling */}
      <img src="https://wallpaperaccess.com/full/2690563.jpg" alt="Background" />
      <div className="content">
        <div className="login">
          <p>Sign Up</p>
           {/* Form submission is handled by the save function */}
          <form onSubmit={save}>
            <label>
              Username:
              <input
                type="text"
                id="loginname"
                name="username"
                value={loginname}
                onChange={(event) => setLoginname(event.target.value)}
              />
            </label>
            <br />
            <br />
            <label>
              Email:
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <br />
            <br />
            <label>
              Password:
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <br />
            <button type="submit" className="btn2">Sign Up</button>
            <div className="div2">
              <p>or</p>
            </div>
            {/* Social media login options */}
            <ul>
              <li>
                <img className="img2" src={GoogleIcon} alt="Google" />
                <img className="img2" src={FacebookIcon} alt="Facebook" />
                <img className="img2" src={MicroIcon} alt="Microsoft" />
              </li>
            </ul>
            <div className="div2">
               {/* Link to sign-in page for users who already have an account */}
              <p>If You Already Have an Account? <span><Link to="/signin" className="btn2">Sign in</Link></span></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
