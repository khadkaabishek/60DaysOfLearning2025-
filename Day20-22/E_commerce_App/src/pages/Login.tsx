import React, { useState } from "react";
import "./Login.css"; 
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Processing...");
    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok) {
        setMessage("✅ Login successful!");
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        
        
        // Inside handleSubmit, after setting token
        navigate("/dashboard");
      } else {
        setMessage(result.message || "❌ Login failed");
      }
    } catch (err) {
      console.log("Error Encountered: ", err);
      setMessage("⚠️ Something went wrong, try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>
        <p className="message">{message}</p>
      </form>
    </div>
  );
};

export default Login;
