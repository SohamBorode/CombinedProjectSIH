function AlertCard({ alert }) {
  return (
    <div className="alert-card">

      <div className="alert-icon">
        {alert.icon || ""}
      </div>

      <div className="alert-content">
        <h3>{alert.title}</h3>

        <p>{alert.message}</p>

        <small>{alert.time}</small>
      </div>

      <span className={`risk-badge ${alert.risk.toLowerCase()}`}>
        {alert.risk}
      </span>

    </div>
  );
}

export default AlertCard;

