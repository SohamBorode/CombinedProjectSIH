function Advisory() {
  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>Crop Advisory</h1>

          <p>
            Recommended actions for maintaining crop health.
          </p>
        </div>

      </div>

      <div className="content-card">

        <h2> Cotton Leaf Blight</h2>

        <p style={{ marginTop: "10px", color: "#6b756e" }}>
          Moderate disease risk has been identified.
          Follow the recommended management practices.
        </p>

      </div>

      <div className="two-column">

        <div className="content-card">

          <h2>✓ Recommended Actions</h2>

          <div className="activity-item">
          
            <div>
              <strong>Remove infected leaves</strong>
              <p>
                Remove heavily infected plant parts.
              </p>
            </div>
          </div>

          <div className="activity-item">
            
            <div>
              <strong>Avoid excess moisture</strong>
              <p>
                Maintain proper field drainage.
              </p>
            </div>
          </div>

          <div className="activity-item">
            
            <div>
              <strong>Monitor regularly</strong>
              <p>
                Check the crop every 2–3 days.
              </p>
            </div>
          </div>

        </div>

        <div className="content-card">

          <h2> Important</h2>

          <p
            style={{
              marginTop: "15px",
              color: "#6b756e",
              lineHeight: "1.7"
            }}
          >
            Use agricultural inputs only according to
            approved labels and guidance from agriculture
            experts or extension officers.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Advisory;