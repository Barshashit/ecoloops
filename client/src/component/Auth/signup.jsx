import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css"; // Make sure this CSS file exists

const Signup = ({ onSignup }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.phone) {
      console.log("Pre-filled phone from state:", location.state.phone);
      setForm(prev => ({ ...prev, phone: location.state.phone }));
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Attempting signup with:", form);

    // Basic validation
    if (!form.name || !form.email || !form.phone || !form.dob || !form.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    // Phone number validation (basic)
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Phone number must be 10 digits");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending signup request...");
      const startTime = Date.now();
      
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log(`Signup response (${Date.now() - startTime}ms):`, res.data);
      console.log("Response status:", res.status);

      if (res.status === 201) {
        if (res.data.token) {
          console.log("Signup successful! Token received");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userName", res.data.name);
          onSignup({
            name: res.data.name,
            email: res.data.email
          });
          navigate("/");
        } else {
          throw new Error("No token in response");
        }
      } else {
        throw new Error(`Unexpected status: ${res.status}`);
      }
    } catch (err) {
      console.error("Signup error:", err);
      const errorMessage = err.response?.data?.msg || 
                         err.message || 
                         "Signup failed. Please try again.";
      setError(errorMessage);
      console.log("Error details:", {
        response: err.response,
        request: err.request,
        config: err.config
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h2>Create Your Account</h2>
        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              disabled={!!location.state?.phone || loading}
            />
          </div>
          
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={loading ? "loading" : ""}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>

      {/* Debug panel - remove in production */}
      <div className="debug-panel">
        <h3>Debug Info</h3>
        <div>Form State: {JSON.stringify(form)}</div>
        <div>Loading: {loading.toString()}</div>
        <div>Error: {error}</div>
      </div>
    </div>
  );
};

export default Signup;




