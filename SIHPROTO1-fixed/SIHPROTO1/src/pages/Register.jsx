import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../services/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phno: "",
    district: "",
    village: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiPost("/auth/register", {
        name: form.name,
        email: form.email,
        phno: form.phno,
        district: form.district,
        village: form.village,
        password: form.password,
      });

      alert("Farmer registered successfully. Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">🌱 CropShield</div>

        <h1>Create Farmer Account</h1>
        <p>Register with your basic details to access farmer services.</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phno"
            placeholder="Enter phone number"
            value={form.phno}
            onChange={handleChange}
            required
          />

          <label>District</label>
          <input
            type="text"
            name="district"
            placeholder="Enter district"
            value={form.district}
            onChange={handleChange}
            required
          />

          <label>Village</label>
          <input
            type="text"
            name="village"
            placeholder="Enter village"
            value={form.village}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="primary-btn full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
