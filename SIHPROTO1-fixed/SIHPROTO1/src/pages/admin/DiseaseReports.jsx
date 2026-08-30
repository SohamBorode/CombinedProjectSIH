import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../../services/api";

const fallbackReports = [
  {
    id: 1,
    farmer: "Rahul Patil",
    crop: "Cotton",
    disease: "Leaf Blight",
    confidence: 92,
    severity: "Moderate",
    status: "Pending",
  },
  {
    id: 2,
    farmer: "Amit Sharma",
    crop: "Soybean",
    disease: "Pest Infestation",
    confidence: 88,
    severity: "High",
    status: "Verified",
  },
];

function DiseaseReports() {
  const [reports, setReports] = useState(fallbackReports);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/admin/reports")
      .then((data) => {
        const normalized = data?.data || data || fallbackReports;
        setReports(Array.isArray(normalized) ? normalized : fallbackReports);
      })
      .catch(() => setReports(fallbackReports))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="page">Loading reports...</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Disease Reports</h1>
          <p>Review and validate farmer crop health reports.</p>
        </div>
      </div>

      <div className="content-card">
        <div className="table-tools">
          <input type="text" placeholder="Search reports..." />

          <select>
            <option>All Status</option>
            <option>Pending</option>
            <option>Verified</option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Farmer</th>
                <th>Crop</th>
                <th>Disease</th>
                <th>Confidence</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.farmer}</td>
                  <td>{report.crop}</td>
                  <td>
                    <strong>{report.disease}</strong>
                  </td>
                  <td>{report.confidence}%</td>
                  <td>{report.severity}</td>
                  <td>
                    <span
                      className={
                        report.status === "Verified"
                          ? "status verified"
                          : "status pending"
                      }
                    >
                      {report.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/reports/${report.id}`} className="review-btn">
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DiseaseReports;