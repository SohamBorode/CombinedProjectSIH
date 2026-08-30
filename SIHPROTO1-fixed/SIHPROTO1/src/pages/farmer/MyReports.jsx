import { useEffect, useState } from "react";
import ReportCard from "../../components/ReportCard";
import { apiGet } from "../../services/api";
import { getFarmerId } from "../../services/auth";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const farmerId = getFarmerId();
    if (!farmerId) {
      setReports([]);
      setLoading(false);
      return;
    }

    apiGet(`/reports?farmerId=${farmerId}`)
      .then((data) => {
        const normalized = data?.data || data || [];
        setReports(Array.isArray(normalized) ? normalized : []);
      })
      .catch(() => setReports([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="page">Loading reports...</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>My Reports</h1>
          <p>View your previous crop health reports.</p>
        </div>
      </div>

      <div className="content-card">
        {reports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          reports.map((report) => <ReportCard key={report.id} report={report} />)
        )}
      </div>
    </div>
  );
}

export default MyReports;