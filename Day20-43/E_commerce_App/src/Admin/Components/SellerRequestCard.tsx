import React from "react";
import "../styles/reqCard.css";

interface Props {
  request: {
    id: string;
    email: string;
    phone: string;
    address: string;
    nidFront: string;
    nidBack: string;
    addressProof: string;
    status: string;
    appliedAt: string;
  };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const SellerRequestCard: React.FC<Props> = ({ request, onApprove, onReject }) => {
  return (
    <div className="request-card">
      <p><strong>Email:</strong> {request.email}</p>
      <p><strong>Phone:</strong> {request.phone}</p>
      <p><strong>Address:</strong> {request.address}</p>
      <div className="documents">
        <p><strong>NID Front:</strong></p>
        <img src={request.nidFront} alt="NID Front" />
        <p><strong>NID Back:</strong></p>
        <img src={request.nidBack} alt="NID Back" />
        <p><strong>Address Proof:</strong></p>
        <img src={request.addressProof} alt="Address Proof" />
      </div>
      <div className="buttons">
        <button onClick={() => onApprove(request.id)}>Approve</button>
        <button onClick={() => onReject(request.id)}>Reject</button>
      </div>
    </div>
  );
};

export default SellerRequestCard;
