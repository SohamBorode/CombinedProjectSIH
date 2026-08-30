import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>CropShield</span>
      </div>

      <div className="admin-label">ADMIN PANEL</div>

      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/admin/reports">
          Disease Reports
        </NavLink>

        <NavLink to="/admin/hotspots">
          Hotspots
        </NavLink>

        <NavLink to="/admin/farmers">
          Farmers
        </NavLink>

        <NavLink to="/admin/alerts">
          Alerts
        </NavLink>

        <NavLink to="/admin/analytics">
          Analytics
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/login">Logout</NavLink>
      </div>
    </aside>
  );
}

export default AdminSidebar;

