import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
const Header: React.FC = () => {
  const token = localStorage.getItem("token");
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          🛍️ E-Shop
        </Link>

        <nav className="nav">
          {token && user ? (
            <div className="user-info">
              <img
                src={user.profilePic || "/images.png"}
                alt="User Avatar"
                className="user-avatar"
              />
              <span className="user-name">{user.name || user.email}</span>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
