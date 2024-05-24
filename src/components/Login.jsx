import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/DoughDetectiveLogo.png";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      const user = response.data.user;
      setUser(user);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleLogin}>
        <img src={logo} alt="DoughDetective" />
        <h5>Sign in to your account</h5>
        {errorMessage && <h5 className="login-error">{errorMessage}</h5>}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-btn" type="submit">
          Sign in
        </button>
      </form>
      <p className="signup">
        Don't have an account? &nbsp;
        <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
