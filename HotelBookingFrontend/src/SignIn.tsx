import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function SignIn() {
  //satate to email password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const navigate = useNavigate();

  //handel function login after registered
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      // POST request
      const response = await axios.post("http://localhost:8080/account/login", {
        email: email,
        password: password,
      });
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
     
      // Navigate based on userType
      if (userType === "user") {
        navigate("/room"); 
      }
      if (userType === "admin") {
        navigate("/admin");
      }

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Axios error: error.response contains the server's response
        if (error.response && error.response.data) {
          alert(error.response.data.message || "Login failed");
        } else {
          alert("Error: Unable to connect to the backend.");
        }
      } else {
        // Non-Axios error, handle it as a generic error
        alert("An unexpected error occurred.");
      }
    }

  }

  return (
    <section className="container">
      {/* Background image for styling */}
      <img className="imgback" src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background" />
      <div className="content">
        <div className="login">
          <p>Log In</p>
          {/* Form submission is handled by the login function */}
          <form onSubmit={login}>
            <label>
              Email:
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
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
            <div className="form-row">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="autoSizingCheck" />
                <label className="form-check-label" htmlFor="autoSizingCheck">
                  Remember me
                </label>
              </div>
              <div className="submit">
                <Link to='/forgot' style={{ textDecoration:'none',color:'bisque'}}>Forgot password?</Link>
              </div>
              <div className="submit">
                <Link to='/signup' style={{ textDecoration:'none',color:'bisque'}}>Sign Up</Link>
              </div>
            </div>

            {/* Buttons to set userType before form submission */}
            {
              (email === "admin2024@gmail.com" && password === "adminlogin2024") ? (
                <button
                  type="submit"
                  className="btn2 admin"
                  onClick={() => setUserType("admin")} // Set userType as admin
                >
                  Admin
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn2 user"
                  onClick={() => setUserType("user")} // Set userType as user
                >
                  User
                </button>
              )
            }
          </form>
        </div>
      </div>
    </section>
  );
}
export default SignIn;
