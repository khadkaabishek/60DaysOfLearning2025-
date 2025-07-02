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
  quantityAvailable?: number;
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
  const [quantity, setQuantity] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [addToCartStatus, setAddToCartStatus] = useState<string>("");

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
  };

  const handleAddToCart = async () => {
    if (!product) return;


    if (quantity < 1) {
      setAddToCartStatus("Quantity must be at least 1");
      return;
    }
    if (product.quantityAvailable && quantity > product.quantityAvailable) {
      setAddToCartStatus(`Only ${product.quantityAvailable} items available`);
      return;
    }

    if (!user) {
      setAddToCartStatus("Please login to add items to your cart");
      return;
    }

    // Prepare payload
    const payload = {
      productId: product._id,
      quantity,
      color: selectedColor,
      userId: user._id,
    };

    try {
      const res = await fetch(`${backendURL}api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // If using token auth
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setAddToCartStatus("Added to cart successfully!");
      } else {
        const errorData = await res.json();
        setAddToCartStatus(`Failed to add to cart: ${errorData.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      setAddToCartStatus("Network error while adding to cart");
    }
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
        <p className="brand">
          Brand: <strong>Ultima</strong>
        </p>

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
          {user?.role === "user" ? (
            <div>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((q) =>
                    product.quantityAvailable ? Math.min(product.quantityAvailable, q + 1) : q + 1
                  )
                }
              >
                +
              </button>
            </div>
          ) : (
            <></>
          )}
          <div>({product.quantityAvailable ?? "N/A"} Max )</div>
        </div>

        <div className="action-buttons">
          {user?.role === "admin" ? (
            <div className="admin-controls">
              <button type="button" className="edit-button">
                Edit Content
              </button>
            </div>
          ) : (
            <div className="user-actions">
              <button type="button" className="buy-now">
                Buy Now
              </button>
              <button type="button" className="add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          )}
        </div>

        {addToCartStatus && <p className="add-to-cart-status">{addToCartStatus}</p>}

        {/* Feedback Section */}
        <div className="product-feedback-section">
          {user?.role === "admin" ? (
            <div>
              <h2> Tell smth about Product </h2>
              <form onSubmit={handleFeedbackSubmit}>
                <textarea
                  placeholder=" Write here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : (
            <div>
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
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Stars
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit">Submit Feedback</button>
              </form>
            </div>
          )}

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
