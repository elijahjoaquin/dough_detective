import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/DoughDetectiveLogo.png";

function Signup() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [errorMessage2, setErrorMessage2] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    axios
      .post("http://localhost:3001/accounts", {
        firstName,
        lastName,
        username,
        password,
        confirmPassword,
      })
      .then((result) => {
        console.log(result);
        setSuccessMessage("Successfully created your account!");
        setShowSuccess(true);
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setErrorMessage("");
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
          setErrorMessage2(err.response.data.error);
        } else {
          setErrorMessage("An error occurred");
        }
      });
  };

  return (
    <div className="signup-container">
      <form className="form" onSubmit={handleSubmit}>
        <img src={logo} alt="DoughDetective" />
        <h5>Fill out the necessary information</h5>
        {showSuccess && <h5 className="register-success">{successMessage}</h5>}
        <div className="input-group">
          <label for="firstname">First Name</label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label for="lastname">Last Name</label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label for="confirmpassword">Confirm Password</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <p className="password-validation">{errorMessage}</p>
        <p className="password-validation">{errorMessage2}</p>
        <button className="signup-btn" type="submit">
          Create Account
        </button>
      </form>
      <p class="signup">
        Already have an account? &nbsp;
        <Link to="/">Log in</Link>
      </p>
    </div>
  );
}

export default Signup;
