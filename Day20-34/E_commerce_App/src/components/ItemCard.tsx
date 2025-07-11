import React from "react";
import "./../styles/ItemCard.css";
import { useNavigate } from "react-router-dom";
const backendURL = "http://localhost:5001/";


interface ItemCardProps {
  prodData: {
    _id : string,
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    image?: string;
  }[];
}

interface usertype {
  name: string;
  email: string;
  role: string;
}
const ItemCard: React.FC<ItemCardProps> = ({ prodData }) => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user: usertype | null = storedUser ? JSON.parse(storedUser) : null;

  const handleViewMore = (product: typeof prodData[0]) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div className="card-row">
      {prodData.map((item, index) => (
        <div key={index} className="card">
          {item.image && (
            <img
              src={`${backendURL}${item.image}`}
              alt={item.name}
              className="card-image"
            />
          )}
          <div className="card-details">
            <h3 className="card-title">{item.name}</h3>
            <div className="card-price-section">
              <span className="price">Rs.{item.price}</span>
              {item.originalPrice && (
                <>
                  <span className="original-price">Rs.{item.originalPrice}</span>
                  {item.discountPercent && (
                    <span className="discount">-{item.discountPercent}%</span>
                  )}
                </>
              )}
            </div>
            <div className="card-buttons">
              {user?.role === "admin" ? (
                <button className="btn buy-btn">Edit Info</button>
              ) : (
                <button className="btn buy-btn">Buy Now</button>
              )}
              <button
                onClick={() => handleViewMore(item)}
                className="btn view-btn"
              >
                View More
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ItemCard;