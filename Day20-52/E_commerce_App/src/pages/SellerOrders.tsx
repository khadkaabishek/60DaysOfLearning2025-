import React, { useEffect, useState } from "react";
import "./../styles/sellerOrders.css";

interface SellerOrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
}

interface SellerOrder {
  orderId: string;
  buyerName: string;
  items: SellerOrderItem[];
  status: string;
  date: string;
}

const SellerOrders: React.FC = () => {
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchSellerOrders = async () => {
    try {
      const res = await fetch(`http://localhost:5001/orders/seller-orders/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching seller orders:", error);
    }
  };

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  return (
    <div className="seller-orders-page">
      <h2>Orders for Your Products</h2>
      {orders.length === 0 ? (
        <p className="empty-msg">No orders for your products yet.</p>
      ) : (
        orders.map((order) => (
          <div className="seller-order-card" key={order.orderId}>
            <div className="seller-order-header">
              <h3>Order ID: {order.orderId}</h3>
              <span>Status: {order.status}</span>
            </div>
            <p><strong>Buyer:</strong> {order.buyerName}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <div className="seller-order-items">
              {order.items.map((item, index) => (
                <div className="seller-order-item" key={index}>
                  {item.product.image && (
                    <img src={item.product.image} alt={item.product.name} />
                  )}
                  <div>
                    <p>{item.product.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: Rs. {item.product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerOrders;
