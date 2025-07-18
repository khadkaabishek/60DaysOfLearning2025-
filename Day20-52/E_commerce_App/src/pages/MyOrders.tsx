import React, { useEffect, useState } from "react";
import "./../styles/myOrders.css";

interface OwnerType {
  name: string;
  email: string;
}

interface ProductType {
  _id: string;
  name: string;
  price: number;
  image?: string;
  owner?: OwnerType;
}

interface OrderItem {
  product: ProductType;
  quantity: number;
}

interface OrderType {
  _id: string;
  contact: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  status: string;
  items: OrderItem[]; // ✅ Directly from order snapshot
  createdAt: string;
}

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `http://localhost:5001/checkout/my-orders/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      setError("Something went wrong while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
console.log(orders);
  if (loading) return <div className="loading">Loading your orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-orders-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p className="empty-msg">You have not placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            {/* Header */}
            <div className="order-header">
              <h3>Order ID: {order._id}</h3>
              <span>Status: {order.status}</span>
            </div>

            {/* Contact */}
            <div className="order-details">
              <p>
                <strong>Address:</strong> {order.contact.address},{" "}
                {order.contact.city}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Items */}
            <div className="order-items">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div className="order-item" key={index}>
                    <img
                      src={`http://localhost:5001/${item.product.image}`}
                      alt={item.product.name}
                    />
                    <div>
                      <p>
                        <strong>{item.product.name}</strong>
                      </p>
                      <p>Qty: {item.quantity}</p>
                      <p>
                        Price: Rs. {item.product.price.toLocaleString()}
                      </p>
                      {item.product.owner && (
                        <p className="seller-info">
                          <strong>Seller:</strong> {item.product.owner.name} (
                          {item.product.owner.email})
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No items in this order.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
