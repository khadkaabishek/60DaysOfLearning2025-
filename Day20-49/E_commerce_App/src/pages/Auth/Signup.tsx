import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/login.css"; // Shared style for login & signup

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Sending...");

    try {
      const response = await fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("✅ Signup successful!");
        navigate("/login");
      } else {
        setMessage(result.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="Enter your password" />
        </div>
        <button type="submit" className="auth-button">Sign Up</button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;
