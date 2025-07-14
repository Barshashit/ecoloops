import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Auth.css";

const Auth = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleContinue = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/check-user", {
        phone: input.trim(),
      });
 console.log("Check-user response:", res.data); // Add this line
      if (res.data.exists) {
        navigate("/login", { state: { phone: input.trim() } });
      } else {
        navigate("/signup", { state: { phone: input.trim() } });
      }
    } catch (error) {
      alert("Server error");
      console.error("Auth error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Enter your phone number</h2>
        <input
          type="tel"
          placeholder="Phone number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="auth-input"
        />
        <button onClick={handleContinue} className="auth-button">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Auth;





