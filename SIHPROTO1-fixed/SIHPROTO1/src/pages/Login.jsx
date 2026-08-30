import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../services/api";
import { requestLocationPermission } from "../services/auth";

function Login() {
  const [role, setRole] = useState("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await apiPost("/auth/login", {
        email,
        password,
        role,
      });

      localStorage.setItem("token", response?.token);
      localStorage.setItem("userRole", response?.user?.role || role);
      localStorage.setItem("userName", response?.user?.name || "Farmer");
      localStorage.setItem("farmerId", response?.user?.id);

      if (role === "farmer") {
        try {
          await requestLocationPermission();
        } catch (locationError) {
          console.warn("Location permission not granted on login:", locationError.message);
        }
        navigate("/farmer/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      alert(error.message || "Login failed. Please check your credentials.");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">🌱 CropShield</div>

        <h1>Welcome Back</h1>

        <p>Login to access your crop health dashboard.</p>

        <div className="role-switch">
          <button
            type="button"
            className={role === "farmer" ? "active" : ""}
            onClick={() => setRole("farmer")}
          >
            👨‍🌾 Farmer
          </button>

          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            👨‍💼 Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email / Mobile</label>
          <input
            type="text"
            placeholder="Enter email or mobile"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="primary-btn full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {role === "farmer" && (
          <p className="auth-footer">
            New farmer?
            <Link to="/register">Create account</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;