import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/checkout.css";

interface CartItemType {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    brand?: string;
    color?: string;
  };
  quantity: number;
}

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");


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

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shippingFee = 100;
  const total = subtotal + shippingFee;

  const handlePlaceOrder = async () => {
    if (!name || !phone || !address || !city) {
      alert("Please fill all shipping details!");
      return;
    }

    const orderData = {
      userId: user.id,
      name,
      phone,
      address,
      city,
      cartItems,
      subtotal,
      shippingFee,
      total,
    };

    try {
      const res = await fetch("http://localhost:5001/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        alert("Order placed successfully!");
        navigate("/thank-you");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <h2>Shipping Details</h2>
        <form className="shipping-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>
      </div>

      <div className="checkout-right">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.product.name} × {item.quantity} = Rs.{" "}
              {item.product.price * item.quantity}
            </li>
          ))}
        </ul>
        <p>Subtotal: Rs. {subtotal}</p>
        <p>Shipping Fee: Rs. {shippingFee}</p>
        <h2>Total: Rs. {total}</h2>
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default Checkout;
