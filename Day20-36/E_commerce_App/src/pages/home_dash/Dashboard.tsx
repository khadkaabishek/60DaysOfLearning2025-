import React, { useEffect, useState } from "react";
import "./../../styles/Dashboard.css";
import ItemCard from "../../components/ItemCard";

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getCardData = async () => {
      setError(null);
      try {
        const response = await fetch("http://localhost:5001/api/get_item", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
       
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        console.error("Error fetching item:", err);
        setError(err.message || "Something went wrong");
      }
    };

    getCardData();
  }, [token]);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      <ItemCard prodData={products} />
    </div>
  );
};

export default Dashboard;
