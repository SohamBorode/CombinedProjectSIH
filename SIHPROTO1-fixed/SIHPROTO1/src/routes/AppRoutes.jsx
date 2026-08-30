import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Public pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Farmer pages
import FarmerLayout from "../layouts/FarmerLayout";
import FarmerDashboard from "../pages/farmer/Dashboard";
import DiseaseDetection from "../pages/farmer/DiseaseDetection";
import DetectionResult from "../pages/farmer/DetectionResult";
import MyReports from "../pages/farmer/MyReports";
import Alerts from "../pages/farmer/Alerts";
import Weather from "../pages/farmer/Weather";
import Advisory from "../pages/farmer/Advisory";

// Admin pages
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import DiseaseReports from "../pages/admin/DiseaseReports";
import ReportReview from "../pages/admin/ReportReview";
import Hotspots from "../pages/admin/Hotspots";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* ================= FARMER ================= */}

        <Route
          path="/farmer"
          element={<FarmerLayout />}
        >
          <Route
            path="dashboard"
            element={<FarmerDashboard />}
          />

          <Route
            path="detection"
            element={<DiseaseDetection />}
          />

          <Route
            path="detection/result"
            element={<DetectionResult />}
          />

          <Route
            path="reports"
            element={<MyReports />}
          />

          <Route
            path="alerts"
            element={<Alerts />}
          />

          <Route
            path="weather"
            element={<Weather />}
          />

          <Route
            path="advisory"
            element={<Advisory />}
          />
        </Route>


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="reports"
            element={<DiseaseReports />}
          />

          <Route
            path="reports/:id"
            element={<ReportReview />}
          />

          <Route
            path="hotspots"
            element={<Hotspots />}
          />
        </Route>


        {/* ================= FALLBACK ================= */}

        <Route
          path="*"
          element={<Landing />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;