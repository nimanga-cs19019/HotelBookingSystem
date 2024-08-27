// SignIn.tsx
import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from "axios";

const SignIn = () => {
  //satate to email password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  //function to handle login after registered
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
        //POST request
        await axios.post("http://localhost:8080/api/v1/login/SignIn", {
        email: email,
        password: password,
      }).then((res) => {
        console.log(res.data);// Handle different responses from the server

        if (res.data.message === "Email not exits") {
          alert("Email does not exist");
        } else if (res.data.message === "Login Success") {
          navigate("/booking");// Navigate to booking page on successful login
        } else {
          alert("Incorrect Email or Password. Do not match");
        }
      }, (fail) => {
        console.error(fail); // Error if request fail
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);// Show error message if error is of type Error
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
          <h2>Log In</h2>
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
            <button type="submit" className="btn2">Log in</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
