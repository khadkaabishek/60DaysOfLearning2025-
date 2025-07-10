import React, { useState } from "react";
import "./../styles/BecomeSeller.css";

const BecomeSellerForm: React.FC = () => {
  const [showNIDPreview, setShowNIDPreview] = useState(false);

  return (
    <section className="seller-section" id="seller-form">
      <div className="form-container">
        <h1 className="form-title">Apply to Become a Seller</h1>

        <form
          className="seller-form"
          action="/api/seller/apply"
          method="POST"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="email">Official Email:</label>
            <input type="email" name="email" id="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Official Phone:</label>
            <input type="text" name="phone" id="phone" required />
          </div>

          <div className="form-group">
            <label htmlFor="address">Permanent Address:</label>
            <input type="text" name="address" id="address" required />
          </div>

          <div className="form-group">
            <label htmlFor="nidFront">NID Card (Front):</label>
            <input
              type="file"
              name="nidFront"
              id="nidFront"
              accept="image/*,application/pdf"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nidBack">NID Card (Back):</label>
            <input
              type="file"
              name="nidBack"
              id="nidBack"
              accept="image/*,application/pdf"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressProof">Address Proof (e.g. Utility Bill):</label>
            <input
              type="file"
              name="addressProof"
              id="addressProof"
              accept="image/*,application/pdf"
              required
            />
          </div>

          <div className="form-note">
            Not sure how your NID should look?{" "}
            <button
              type="button"
              className="nid-preview-link"
              onClick={() => setShowNIDPreview(true)}
            >
              View Sample
            </button>
          </div>

          <div className="form-group">
            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </div>
        </form>
      </div>

      {showNIDPreview && (
        <div className="modal-overlay" onClick={() => setShowNIDPreview(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src="/6473a3ca-6d73-4deb-a109-23e37178dcff-at1000.jpg"
              alt="Sample NID"
              className="modal-image"
            />
            <button
              className="close-button"
              onClick={() => setShowNIDPreview(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BecomeSellerForm;
