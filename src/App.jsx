import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const showNavbar = () => {
    return !["/signup", "/"].includes(location.pathname);
  };

  return (
    <div className="App">
      {showNavbar() && <Navbar />}
      <Routes>
        <Route path="/" element={<Login setUser={updateUser} />} />
        <Route path="/signup" element={<Signup />} />
        {user && <Route path="/home" element={<Home user={user} />} />}
      </Routes>
    </div>
  );
}

export default App;
