import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {

  return (
    <div className="dashboard-layout">

      <AdminSidebar />

      <main className="main-area">

        <header className="topbar">

          <div>
            <strong>Administration</strong>
            <small>Crop Health Monitoring System</small>
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

export default AdminLayout;