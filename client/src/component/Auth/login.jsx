import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ onLogin }) => {  // CHANGE 1: Expect onLogin prop instead of setUser
  const [form, setForm] = useState({ 
    phone: "", 
    password: "",
    rememberMe: false  // CHANGE 2: Add rememberMe checkbox
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.phone) {
      setForm(prev => ({ ...prev, phone: location.state.phone }));
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/login`,
        {
          phone: form.phone.trim(),
          password: form.password,
          rememberMe: form.rememberMe  // CHANGE 3: Send rememberMe to backend
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );

      // CHANGE 4: Call onLogin with user data
      onLogin({
        name: res.data.name,
        email: res.data.email
      });
      
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login to Your Account</h2>
        
        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          {/* CHANGE 5: Add remember me checkbox */}
          <div className="form-group remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={form.rememberMe}
              onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
            />
            <label htmlFor="rememberMe">Keep me logged in</label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;






