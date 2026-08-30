import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard";
import AlertCard from "../../components/AlertCard";
import ReportCard from "../../components/ReportCard";
import { apiGet } from "../../services/api";
import { getFarmerId, getStoredLocation } from "../../services/auth";

const emptyDashboard = {
  farmer: {},
  alerts: [],
  reports: [],
  weather: {},
};

function Dashboard() {
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const farmerId = getFarmerId();
    if (!farmerId) {
      setDashboard(emptyDashboard);
      setLoading(false);
      return;
    }

    // Fetch farmer dashboard data
    apiGet(`/farmer/dashboard?farmerId=${farmerId}`)
      .then((data) => {
        const normalized = data?.data || data || emptyDashboard;
        setDashboard({
          ...emptyDashboard,
          ...normalized,
          farmer: normalized?.farmer || {},
          alerts: normalized?.alerts || [],
          reports: normalized?.reports || [],
        });
      })
      .catch(() => setDashboard(emptyDashboard))
      .finally(() => setLoading(false));

    // Fetch weather separately using real GPS from localStorage
    const stored = getStoredLocation();
    const lat = stored?.latitude ?? 20.9374;
    const lng = stored?.longitude ?? 77.7796;
    apiGet(`/weather?lat=${lat}&lng=${lng}`)
      .then((data) => setWeather(data?.data || data || {}))
      .catch(() => setWeather({}));
  }, []);

  const farmer = dashboard.farmer || {};
  const alerts = dashboard.alerts || [];
  const reports = dashboard.reports || [];

  if (loading) {
    return <div className="page">Loading dashboard...</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Good Morning, {farmer.name ? farmer.name.split(" ")[0] : "Farmer"} 👋</h1>
          <p>Here's what's happening with your farm today.</p>
        </div>

        <Link to="/farmer/detection" className="primary-btn">
          📷 Check Crop
        </Link>
      </div>

      <div className="farm-banner">
        <div>
          <small>MY FARM</small>
          <h2>🌱 {farmer.crop || "Farm"} Farm</h2>
          <p>
            📍 {farmer.village || ""}{farmer.village && farmer.district ? ", " : ""}{farmer.district || ""}
          </p>
        </div>

        <div className="farm-stats">
          <div>
            <strong>{farmer.area || "-"}</strong>
            <small>Farm Area</small>
          </div>

          <div>
            <strong>{farmer.cropStage || "-"}</strong>
            <small>Crop Stage</small>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard icon="🌱" title="Crop Health" value="Healthy" subtitle="Good condition" />
        <StatCard icon="⚠️" title="Risk Level" value="Medium" subtitle="Monitor closely" />
        <StatCard icon="📋" title="Total Reports" value={String(reports.length).padStart(2, "0")} subtitle="This season" />
      </div>

      <div className="two-column">
        <section className="content-card">
          <div className="card-header">
            <h2>Recent Alerts</h2>
            <Link to="/farmer/alerts">View All</Link>
          </div>

          {(alerts || []).length === 0 ? (
            <p>No alerts for this farmer yet.</p>
          ) : (alerts || []).slice(0, 2).map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </section>

        <section className="content-card">
          <div className="card-header">
            <h2>Today's Weather</h2>
            <Link to="/farmer/weather">Details</Link>
          </div>

          <div className="weather-summary">
            <div className="temperature">
              ☀️
              <strong>{weather.currentTemp != null ? weather.currentTemp : "-"}°</strong>
            </div>

            <div>
              <h3>{weather.description || "No weather data"}</h3>
              <p>{weather.location || ""}</p>
            </div>
          </div>

          <div className="weather-details">
            <div>
              <span>Humidity</span>
              <strong>{weather.humidity != null ? weather.humidity : "-"}%</strong>
            </div>

            <div>
              <span>Rainfall</span>
              <strong>{weather.rainfall != null ? weather.rainfall : "-"} mm</strong>
            </div>

            <div>
              <span>Wind</span>
              <strong>{weather.windSpeed != null ? weather.windSpeed : "-"} km/h</strong>
            </div>
          </div>
        </section>
      </div>

      <section className="content-card">
        <div className="card-header">
          <h2>Recent Reports</h2>
          <Link to="/farmer/reports">View All</Link>
        </div>

        {(reports || []).length === 0 ? (
          <p>No reports for this farmer yet.</p>
        ) : (reports || []).slice(0, 2).map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </section>
    </div>
  );
}

export default Dashboard;