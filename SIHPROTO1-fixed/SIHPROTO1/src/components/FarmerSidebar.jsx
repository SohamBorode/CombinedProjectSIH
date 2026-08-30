import { NavLink, useNavigate } from "react-router-dom";
import { clearSession, getUserName } from "../services/auth";

function FarmerSidebar() {
  const navigate = useNavigate();
  const farmerName = getUserName() || "Farmer";
  const initials = farmerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "F";

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>CropShield</span>
      </div>

      <div className="user-box">
        <div className="avatar">{initials}</div>
        <div>
          <strong>{farmerName}</strong>
          <small>Farmer</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/farmer/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/farmer/detection">
          Check Crop
        </NavLink>

        <NavLink to="/farmer/reports">
          My Reports
        </NavLink>

        <NavLink to="/farmer/alerts">
          Risk Alerts
        </NavLink>

        <NavLink to="/farmer/weather">
          Weather
        </NavLink>

        <NavLink to="/farmer/advisory">
          Advisory
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button type="button" onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default FarmerSidebar;
