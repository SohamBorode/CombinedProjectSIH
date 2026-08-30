import { Link, useLocation } from "react-router-dom";

function DetectionResult() {
  const { state } = useLocation();

  const result = state || {
    diseaseName: "Leaf Blight",
    confidence: 92,
    severity: "Moderate",
    crop: "Cotton",
    cropStage: "Vegetative",
    warning: "Symptoms may spread if not monitored.",
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Analysis Result</h1>
          <p>Crop health analysis completed.</p>
        </div>
      </div>

      <div className="result-grid">
        <div className="result-image">
          🌿
          <p>Uploaded Crop Image</p>
        </div>

        <div className="content-card">
          <span className="result-label">DETECTED DISEASE</span>

          <h1 className="disease-name">{result.diseaseName || result.disease || "Unknown"}</h1>

          <div className="confidence">
            <span>Confidence</span>
            <strong>{result.confidence || 0}%</strong>
          </div>

          <div className="confidence-bar">
            <div style={{ width: `${result.confidence || 0}%` }} />
          </div>

          <div className="result-stats">
            <div>
              <span>Severity</span>
              <strong>{result.severity || "Unknown"}</strong>
            </div>

            <div>
              <span>Crop</span>
              <strong>{result.crop || "Unknown"}</strong>
            </div>
          </div>

          <div className="result-warning">
            ⚠️ {result.warning || "Monitor the crop closely."}
          </div>

          <Link to="/farmer/advisory" className="primary-btn full">
            View Management Advisory
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetectionResult;