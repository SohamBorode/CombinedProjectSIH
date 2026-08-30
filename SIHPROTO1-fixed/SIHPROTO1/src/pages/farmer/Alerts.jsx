import { useEffect, useState } from "react";
import AlertCard from "../../components/AlertCard";
import { apiGet } from "../../services/api";
import { getFarmerId } from "../../services/auth";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const farmerId = getFarmerId();
    if (!farmerId) {
      setAlerts([]);
      setLoading(false);
      return;
    }

    apiGet(`/alerts?farmerId=${farmerId}`)
      .then((data) => {
        const normalized = data?.data || data || [];
        setAlerts(Array.isArray(normalized) ? normalized : []);
      })
      .catch(() => setAlerts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="page">Loading alerts...</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Risk Alerts</h1>
          <p>Important crop health alerts for your farm.</p>
        </div>
      </div>

      <div className="content-card">
        {alerts.length === 0 ? (
          <p>No alerts available.</p>
        ) : (
          alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
        )}
      </div>
    </div>
  );
}

export default Alerts;