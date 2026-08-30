import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">

      <header className="landing-nav">

        <div className="brand">
          🌱 CropShield
        </div>

        <nav>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </nav>

      </header>

      <section className="hero">

        <div className="hero-content">

          <div className="hero-tag">
            🌾 Smart Crop Health Platform
          </div>

          <h1>
            Detect Early.
            <br />
            <span>Protect Your Crops.</span>
          </h1>

          <p>
            A smart crop-health platform that helps farmers
            identify diseases and pest infestations early,
            monitor risks and receive timely management advice.
          </p>

          <div className="hero-actions">

            <Link
              to="/login"
              className="primary-btn"
            >
              Get Started →
            </Link>

            <a
              href="#features"
              className="outline-btn"
            >
              Explore Features
            </a>

          </div>

        </div>

        <div className="hero-visual">

          <div className="crop-card">

            <div className="crop-icon">
              🌱
            </div>

            <h3>Crop Health</h3>

            <div className="healthy">
              <span></span>
              Healthy
            </div>

            <div className="crop-info">
              <div>
                <small>Crop</small>
                <strong>Cotton</strong>
              </div>

              <div>
                <small>Risk</small>
                <strong>Low</strong>
              </div>
            </div>

          </div>

        </div>

      </section>

      <section
        id="features"
        className="features-section"
      >

        <div className="section-title">
          <span>FEATURES</span>
          <h2>Complete Crop Health Monitoring</h2>
          <p>
            Everything farmers and agriculture officials need
            to monitor crop health.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div>📷</div>
            <h3>Crop Disease Detection</h3>
            <p>
              Upload crop images and identify possible
              diseases and pest infestations.
            </p>
          </div>

          <div className="feature-card">
            <div>⚠️</div>
            <h3>Risk Alerts</h3>
            <p>
              Receive timely warnings about crop disease
              and pest risks.
            </p>
          </div>

          <div className="feature-card">
            <div>🌦️</div>
            <h3>Weather Monitoring</h3>
            <p>
              Monitor weather conditions that may affect
              crop health.
            </p>
          </div>

          <div className="feature-card">
            <div>👨‍🌾</div>
            <h3>Expert Advisory</h3>
            <p>
              Provide farmers with practical crop management
              recommendations.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Landing;