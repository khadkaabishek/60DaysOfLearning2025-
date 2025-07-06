import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/header.css";
import { useState,useEffect } from "react";
const Header: React.FC = () => {
  const token = localStorage.getItem("token") ?? "";
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/');
  };
  interface CartItemType {
    _id: string;
    product: {
      _id: string;
      name: string;
      price: number;
      image?: string;
    };
    quantity: number;
  }
 const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const fetchCart = async () => {
      if (!user?.id) return;
      if(user.role === "admin") return;
      try {
        const res = await fetch(`http://localhost:5001/cart/${user.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data?.items) {
          setCartItems(data.items);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    useEffect(() => {
      fetchCart();
    }, []);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);

    useEffect(() => {
      const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setTotalQuantity(total);
    }, [cartItems]);
    
    
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">🛍️ E-Shop</Link>

        
        {token && user && (
          <div className="button-container">
          {user.role === "admin" && (
            <button className="Itembutton" onClick={() => navigate('/add-item')}>Add Item</button>
          )}
        
          <button className="Itembutton" onClick={() => navigate('/dashboard')}>View Item</button>
        
          {user.role === "user" && (
            <div className="cart-button-wrapper">
              <button className="Cartbutton" onClick={() => navigate('/your_cart')}>
                Your Cart
              </button>
              <span className="cart-badge">{totalQuantity}</span>
            </div>
          )}
        </div>
        
        )}

        <nav className="nav">
          {token && user ? (
            <div className="user-info">
              <img
                src={user.profilePic || "/images.png"}
                alt="User Avatar"
                className="user-avatar"
              />
              <span className="user-name">{user.name || user.email}</span>
              <button onClick={handleLogout} type="button" className="logout-button">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
