import React, { useEffect, useState } from "react";
import "./../styles/cartItem.css";

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

const token: string | null = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "{}");

const CartItem: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const getData = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`http://localhost:5001/cart/${user.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);
        if (data?.items) {
          setCartItems(data.items);
          console.log("cartItems = ", data.items);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    getData();
  }, [token]);

  if (!user?.id) {
    return <p className="text-red-500 text-center mt-6">User not logged in properly.</p>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <p className="text-gray-600 text-center mt-6">🛒 Your cart is empty.</p>;
  }

  const removeFromCart = (id: string) => {
    console.log("Removing", id);
    // You can add delete logic here
  };

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
            <p className="cart-meta">Quantity: {item.quantity}</p>
            <p className="cart-meta">Price: ₹{item.product?.price}</p>
            <p className="cart-total">
              Total: ₹{item.product?.price * item.quantity}
            </p>
          </div>
          <button className="remove-button" onClick={() => removeFromCart(item._id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
