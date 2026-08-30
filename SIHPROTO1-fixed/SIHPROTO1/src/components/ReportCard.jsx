function ReportCard({ report }) {
  return (
    <div className="report-card">

      <div className="report-image">
        🌿
      </div>

      <div className="report-info">

        <h3>{report.disease}</h3>

        <p>
          Crop: {report.crop}
        </p>

        <small>
          {report.date}
        </small>

      </div>

      <div className="report-status">

        <span className={`severity ${report.severity.toLowerCase()}`}>
          {report.severity}
        </span>

        <span
          className={`status ${
            report.status === "Verified"
              ? "verified"
              : "pending"
          }`}
        >
          {report.status}
        </span>

      </div>

    </div>
  );
}

export default ReportCard;