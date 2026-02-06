import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AppContext } from "../context/AppContext";
import Toast from "../components/Toast";
import PageContainer from "../components/PageContainer";

export default function Register() {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AppContext);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    phone: "",
    password: "",
    role: "customer",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <h2 style={styles.title}>Create Account</h2>

      {error && <Toast message={error} />}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Company Name"
          style={styles.input}
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
        />

        <input
          placeholder="Full Name"
          required
          style={styles.input}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          placeholder="Phone Number"
          required
          style={styles.input}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          style={styles.input}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <select
          value={formData.role}
          style={styles.input}
          onChange={(e) =>
            setFormData({ ...formData, role: e.target.value })
          }
        >
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p style={styles.footerText}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </PageContainer>
  );
}

/* STYLES (only component-level styles, layout handled by PageContainer) */
const styles = {
  title: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 22,
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    border: "1px solid #d1d5db",
  },
  button: {
    padding: 12,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 500,
  },
  footerText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
  },
};
