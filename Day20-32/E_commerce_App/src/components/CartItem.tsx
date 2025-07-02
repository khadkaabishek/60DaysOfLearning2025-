import React, { useState } from "react";
import "./../styles/cartItem.css"
interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartItem: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: "1",
      name: "Smart Watch",
      price: 1500,
      quantity: 2,
      image: "/uploads/watch.jpg",
    },
    {
      id: "2",
      name: "Bluetooth Speaker",
      price: 2000,
      quantity: 1,
      image: "/uploads/speaker.jpg",
    },
  ]);

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <p className="text-gray-600 text-center mt-6">🛒 Your cart is empty.</p>
    );
  }

  return (
    <div className="cart-container">
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          {item.image && (
            <img src={`http://localhost:5001/uploads/1751297835941-watch.webp`} alt={item.name} className="cart-image" />
          )}
          <div className="cart-details">
            <h2 className="cart-name">{item.name}</h2>
            <p className="cart-meta">Quantity: {item.quantity}</p>
            <p className="cart-meta">Price: ₹{item.price}</p>
            <p className="cart-total">Total: ₹{item.price * item.quantity}</p>
          </div>
          <button
            className="remove-button"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
