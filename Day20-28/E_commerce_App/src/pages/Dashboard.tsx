import React, { useState } from "react";
import "./Dashboard.css"; 
const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5001/api/get_item", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
     console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      console.log("Response from backend:", data);
      setProducts(data);
    } catch (err: any) {
      console.error("Error fetching item:", err);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>

      <form onSubmit={handleOnSubmit} className="dashboard-form">
        <button type="submit" className="fetch-button">Fetch Products</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="products-list">
        {products.length === 0 ? (
          <p className="no-products">No products fetched yet.</p>
        ) : (
          <ul>
            {products.map((product, index) => (
              <li key={index} className="product-card">
                <p><strong>{product.name}</strong></p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
