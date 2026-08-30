import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost } from "../../services/api";

const fallbackReport = {
  id: 1,
  disease: "Leaf Blight",
  confidence: 92,
  severity: "Moderate",
  crop: "Cotton",
  farmer: "Rahul Patil",
  status: "Pending",
};

function ReportReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(fallbackReport);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState("");

  useEffect(() => {
    apiGet(`/admin/reports/${id}`)
      .then((data) => {
        const normalized = data?.data || data || fallbackReport;
        setReport({ ...fallbackReport, ...normalized });
      })
      .catch(() => setReport(fallbackReport))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAction = async (status) => {
    try {
      await apiPost(`/admin/reports/${id}/status`, {
        status,
        review,
      });
      navigate("/admin/reports");
    } catch (error) {
      alert(error.message || "Unable to update report status");
    }
  };

  if (loading) {
    return <div className="page">Loading report...</div>;
  }

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("/admin/reports")}>
        ← Back to Reports
      </button>

      <div className="page-header">
        <div>
          <h1>Report Review</h1>
          <p>Report #{id}</p>
        </div>
      </div>

      <div className="review-grid">
        <div className="result-image large">
          🌿
          <p>Crop Image</p>
        </div>

        <div className="content-card">
          <h2>AI Analysis</h2>

          <div className="result-row">
            <span>Farmer</span>
            <strong>{report.farmer}</strong>
          </div>

          <div className="result-row">
            <span>Disease</span>
            <strong>{report.disease}</strong>
          </div>

          <div className="result-row">
            <span>Confidence</span>
            <strong>{report.confidence}%</strong>
          </div>

          <div className="result-row">
            <span>Severity</span>
            <strong>{report.severity}</strong>
          </div>

          <div className="result-row">
            <span>Crop</span>
            <strong>{report.crop}</strong>
          </div>

          <hr />

          <h2>Expert Validation</h2>

          <textarea
            rows="5"
            placeholder="Add your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <div className="review-actions">
            <button className="approve-btn" onClick={() => handleAction("Verified")}>
              ✓ Verify Report
            </button>

            <button className="reject-btn" onClick={() => handleAction("Rejected")}>
              ✕ Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportReview;