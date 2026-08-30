import StatCard from "../../components/StatCard";

function Dashboard() {
  const stats = [
    {
      icon: "Farmers",
      title: "Total Farmers",
      value: "1,284",
    },
    {
      icon: "Reports",
      title: "Total Reports",
      value: "438",
    },
    {
      icon: "Pending",
      title: "Pending Review",
      value: "27",
    },
    {
      icon: "Alerts",
      title: "Active Alerts",
      value: "14",
    },
  ];

  const diseaseReports = [
    {
      name: "Leaf Blight",
      count: 124,
      progress: "75%",
    },
    {
      name: "Pest Infestation",
      count: 86,
      progress: "55%",
    },
    {
      name: "Leaf Spot",
      count: 64,
      progress: "40%",
    },
  ];

  const recentActivity = [
    {
      status: "critical",
      title: "New disease report",
      description: "Cotton Leaf Blight",
      time: "10 minutes ago",
    },
    {
      status: "warning",
      title: "Risk alert generated",
      description: "High pest risk in Amravati",
      time: "1 hour ago",
    },
    {
      status: "success",
      title: "Report verified",
      description: "Soybean Leaf Spot",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Monitor crop health activity across farming regions.</p>
        </div>
      </header>

      <div className="stats-grid admin-stats">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      <div className="two-column">
        <section className="content-card">
          <div className="card-header">
            <h2>Disease Reports</h2>
          </div>

          {diseaseReports.map((report) => (
            <div key={report.name}>
              <div className="disease-row">
                <span>{report.name}</span>
                <strong>{report.count}</strong>
              </div>

              <div className="progress">
                <div style={{ width: report.progress }} />
              </div>
            </div>
          ))}
        </section>

        <section className="content-card">
          <div className="card-header">
            <h2>Recent Activity</h2>
          </div>

          {recentActivity.map((activity) => (
            <div className="activity-item" key={activity.title}>
              <span
                className={`activity-status ${activity.status}`}
                aria-hidden="true"
              />

              <div>
                <strong>{activity.title}</strong>
                <p>{activity.description}</p>
                <small>{activity.time}</small>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;

