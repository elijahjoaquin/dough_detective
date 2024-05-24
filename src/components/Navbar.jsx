import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav>
      <div className="navbar">
        <div className="app-name">DoughDetective</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
