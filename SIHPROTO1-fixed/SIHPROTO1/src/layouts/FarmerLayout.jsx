import { Outlet } from "react-router-dom";
import FarmerSidebar from "../components/FarmerSidebar";

function FarmerLayout() {

  return (
    <div className="dashboard-layout">

      <FarmerSidebar />

      <main className="main-area">

        <header className="topbar">

          <div>
            <strong>Crop Health System</strong>
            <small>Monitor your farm</small>
          </div>

          <div className="notification">
            🔔
          </div>

        </header>

        <Outlet />

      </main>

    </div>
  );
}

export default FarmerLayout;