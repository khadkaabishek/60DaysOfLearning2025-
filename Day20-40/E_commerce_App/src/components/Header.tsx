import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/header.css";

const Header: React.FC = () => {
  const token = localStorage.getItem("token") ?? "";
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;
  const navigate = useNavigate();

  const handleMoveToMyItems = () => {
    if (user?.id) navigate(`/${user.id}/my_items`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
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
    if (!user?.id || user.role === "admin") return;
    try {
      const res = await fetch(`http://localhost:5001/cart/${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data?.items) setCartItems(data.items);
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
        <Link to="/" className="logo">
          🛍️ E-Shop
        </Link>

        {token && user && (
          <nav className="nav-links">
            {user.role === "admin" && (
              <>
                <button
                  className="btn nav-btn"
                  onClick={() => navigate("/add-item")}
                >
                  Add Item
                </button>
                <button className="btn nav-btn" onClick={handleMoveToMyItems}>
                  My Products
                </button>
              </>
            )}

            {user.role === "user" && (
              <>
                <button
                  className="btn nav-btn"
                  onClick={() => navigate("/dashboard")}
                >
                  All Products
                </button>

                <button
                  className="btn nav-btn cart-btn"
                  onClick={() => navigate("/your_cart")}
                >
                  Your Cart
                  {totalQuantity > 0 && (
                    <span className="cart-badge">{totalQuantity}</span>
                  )}
                </button>
              </>
            )}
          </nav>
        )}

        <div className="user-section">
          {token && user ? (
            <>


            {user.role ==="user"?( <button className="btn nav-btn" onClick={()=>{navigate('/become_seller');}}>Become a Seller</button> ):( <div></div> )}
              <img
                src={user.profilePic || "/images.png"}
                alt="User Avatar"
                className="user-avatar"
              />
              <span className="user-name">{user.name || user.email}</span>
              <button
                onClick={handleLogout}
                type="button"
                className="btn logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <nav className="nav-links auth-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
