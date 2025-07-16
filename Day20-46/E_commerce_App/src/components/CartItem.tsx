import React, { useEffect, useState } from "react";
import "./../styles/cartItem.css";

interface CartItemType {
  _id: string;
  product: {
    _id: string ;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
}

const token: string | null = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "{}");

const CartItem: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const fetchCart = async () => {
    if (!user?.id) return;
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

  const updateQuantity = async (productId: string, action: "increment" | "decrement") => {
    try {
      const res = await fetch(`http://localhost:5001/cart/${user.id}/update-quantity`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, action }),
      });
      const updatedCart = await res.json();
      if (updatedCart?.items) {setCartItems(updatedCart.items);}
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const res = await fetch(`http://localhost:5001/cart/${user.id}/remove-item`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const updatedCart = await res.json();
      if (updatedCart?.items) setCartItems(updatedCart.items);
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (!user?.id) {
    return <p className="text-red-500 text-center mt-6">User not logged in properly.</p>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <p className="text-gray-600 text-center mt-6">🛒 Your cart is empty.</p>;
  }

  return (
    <div className="cart-container">
      {cartItems.map((item) => (
        <div key={item._id} className="cart-item">
          {item.product?.image && (
            <img
              src={`http://localhost:5001/${item.product.image}`}
              alt={item.product.name}
              className="cart-image"
            />
          )}
          <div className="cart-details">
            <h2 className="cart-name">{item.product?.name}</h2>
            <p className="cart-meta">
              Quantity:
              <button
                onClick={() => updateQuantity(item.product._id, "decrement")}
                disabled={item.quantity <= 1}
              >
                -
              </button>{" "}
              {item.quantity}{" "}
              <button onClick={() => updateQuantity(item.product._id, "increment")}>+</button>
            </p>
            <p className="cart-meta">Price: ₹{item.product?.price}</p>
            <p className="cart-total">Total: ₹{item.product?.price * item.quantity}</p>
          </div>
          <button className="remove-button" onClick={() => removeFromCart(item.product._id)}>
            ❌ Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
