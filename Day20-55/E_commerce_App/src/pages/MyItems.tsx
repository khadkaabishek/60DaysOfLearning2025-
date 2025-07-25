import React from "react";
import ItemCard from "../components/ItemCard";
import { useEffect,useState} from "react";
const MyItems: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
      const [error, setError] = useState<string | null>(null);
      const token:string|null = localStorage.getItem("token");
      const userJSON = localStorage.getItem("user");
      const user = userJSON ? JSON.parse(userJSON) : null;

 useEffect(() => {
    const getCardData = async () => {
      setError(null);
      try {
        const response = await fetch(`http://localhost:5001/api/${user.id}/get-my-items`, {
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
  }, []);

  
  return (<>
  <h1>My Products</h1>
  {error && <p className="error-message">{error}</p>}
  <ItemCard prodData={products}></ItemCard>
  </>);
};

export default MyItems;
