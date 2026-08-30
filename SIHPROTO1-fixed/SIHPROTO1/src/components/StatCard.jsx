function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">
        <p>{title}</p>
        <h2>{value}</h2>

        {subtitle && (
          <small>{subtitle}</small>
        )}
      </div>

    </div>
  );
}

export default StatCard;