import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./../styles/ProductDetail.css";

const backendURL = "http://localhost:5001/";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category : string;
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
const token: string | null = localStorage.getItem("token");
const owner_id = user.id;
const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(location.state?.product || null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [addToCartStatus, setAddToCartStatus] = useState<string>("");

  const [showDeletePopUp,setShowDeletePopUp] = useState(false);
  const handleEdit = (product: Product) => {
    navigate(`/${product._id}/edit_item_info`, { state: { product } });
  };

  const handleDelete = async (product : Product) => { 
    console.log(product._id);
    try {
      const response = await fetch(`http://localhost:5001/api/delete_item/${product._id}`,{
        method : "DELETE",
        headers : { 
        Authorization : `Bearer ${token}`
        }
     });
     if(!response.ok)
       throw Error("Fetching Data Failed")
     console.log(response.json());
     setShowDeletePopUp(false);
     navigate('/dashboard');
    } catch (error) {
      console.log("Error : ",error);
    }
    
  }

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
    setFeedback("");
    setRating(5);
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

    const payload = {
      product: product._id,
      quantity,
      color: selectedColor,
      user: user.id,
    };

    try {
      const res = await fetch(`${backendURL}cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      <div className="product-media">
        <div className="media-preview">
          <img
            src={product.image ? `${backendURL}${product.image}` : ""}
            alt={product.name}
          />
        </div>
        <div className="media-thumbnails">
          <img
            src={product.image ? `${backendURL}${product.image}` : ""}
            alt="thumb"
            className="thumb"
          />
        </div>
      </div>

      {/* Right - Product Info */}
      <div className="product-info">
        <h1>{product.name}</h1>
        <pre className="description">{product.description}</pre>
        <div className="ratings">⭐⭐⭐⭐☆ (429 Ratings)</div>
        <p className="brand">
          Category: <strong>{product.category}</strong>
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
          {user?.role === "user" && (
            <div>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((q) =>
                    product.quantityAvailable
                      ? Math.min(product.quantityAvailable, q + 1)
                      : q + 1
                  )
                }
                disabled={
                  product.quantityAvailable !== undefined && quantity >= product.quantityAvailable
                }
              >
                +
              </button>
            </div>
          )}
          <div>({product.quantityAvailable ?? "N/A"} Max)</div>
        </div>

        <div className="action-buttons">
          {user?.role === "admin" ? (
            <div className="admin-controls">
              <button type="button" className="edit-button" onClick={() => handleEdit(product)}>
                Edit Content
              </button>
              <button type="button" className="delete-button" onClick={() => setShowDeletePopUp(true)}>
                Delete Content
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
          <h2>{user?.role === "admin" ? "Tell smth about Product" : "💬 Share Your Experience"}</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              placeholder={
                user?.role === "admin" ? " Write here..." : "Write your experience here..."
              }
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
            {user?.role !== "admin" && (
              <div className="rating-select">
                <label>Rating:</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Stars
                    </option>
                  ))}
                </select>
              </div>
            )}
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
      {showDeletePopUp && (
     <div className="popup-overlay">
      <div className="popup">
      <p>Are you sure you want to delete this product?</p>
      <button onClick={()=>handleDelete(product)}>Yes, Delete</button>
      <button onClick={() => setShowDeletePopUp(false)}>Cancel</button>
    </div>
  </div>
)}
    </div>
  );
};

export default ProductDetail;
