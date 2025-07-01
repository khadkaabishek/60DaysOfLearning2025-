import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./../styles/ProductDetail.css";

const backendURL = "http://localhost:5001/";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  quantity?: number;
  image?: string;
  colorOptions?: string[];
};

type Feedback = {
  comment: string;
  rating: number;
};

const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(location.state?.product || null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    if (!product && id) {
      fetch(`${backendURL}api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          if (data.colorOptions?.length) setSelectedColor(data.colorOptions[0]);
        })
        .catch((err) => console.error("Error fetching product:", err));
    }

    
    fetchFeedbacks();
  }, [id, product]);

  const fetchFeedbacks = () => {
    const sampleFeedbacks = [
      { comment: "Amazing sound quality!", rating: 5 },
      { comment: "Battery life is decent but not 30 hrs.", rating: 4 },
    ];
    setFeedbacks(sampleFeedbacks);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim() === "") return;

    const newFeedback: Feedback = { comment: feedback, rating };
    setFeedbacks((prev) => [newFeedback, ...prev]);
    setFeedback(""); // Clear input
    setRating(5);

    // TODO: Send to backend via POST
    // fetch(`${backendURL}api/products/${id}/feedback`, { method: "POST", body: JSON.stringify(newFeedback), headers: { "Content-Type": "application/json" } });
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-detail-container">
      {/* Left - Media Section */}
      <div className="product-media">
        <div className="media-preview">
          {product.image && (
            <img src={`${backendURL}${product.image}`} alt={product.name} />
          )}
        </div>
        <div className="media-thumbnails">
          <img src={`${backendURL}${product.image}`} alt="thumb" className="thumb" />
        </div>
      </div>

      {/* Right - Product Info */}
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="description">{product.description}</p>
        <div className="ratings">⭐⭐⭐⭐☆ (429 Ratings)</div>
        <p className="brand">Brand: <strong>Ultima</strong></p>

        <div className="price-section">
          <span className="current-price">Rs. {product.price}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">Rs. {product.originalPrice}</span>
              {product.discountPercent && (
                <span className="discount">-{product.discountPercent}%</span>
              )}
            </>
          )}
        </div>

        {product.colorOptions && (
          <div className="color-options">
            <span>Color:</span>
            {product.colorOptions.map((color) => (
              <button
                key={color}
                className={`color-btn ${selectedColor === color ? "selected" : ""}`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        )}

        <div className="quantity-selector">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        <div className="action-buttons">
  {user.role === "admin" ? (
    <div className="admin-controls">
      <button type="button" className="edit-button">Edit Content</button>
    </div>
  ) : (
    <div className="user-actions">
      <button type="button" className="buy-now">Buy Now</button>
      <button type="button" className="add-to-cart">Add to Cart</button>
    </div>
  )}
</div>


        {/* Feedback Section */}
        <div className="product-feedback-section">
          <h2>💬 Share Your Experience</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              placeholder="Write your experience here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
            <div className="rating-select">
              <label>Rating:</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} Stars</option>
                ))}
              </select>
            </div>
            <button type="submit">Submit Feedback</button>
          </form>

          <div className="user-feedbacks">
            <h3>🧑‍💬 What Others Say:</h3>
            {feedbacks.map((f, index) => (
              <div key={index} className="feedback-card">
                <p>{f.comment}</p>
                <small>⭐ {f.rating} / 5</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
