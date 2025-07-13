import React, { useState } from "react";
import SellerRequestCard from "../Components/SellerRequestCard";

const Requests: React.FC = () => {
    const [requests, setRequests] = useState([
        {
          id: "1",
          email: "applicant1@example.com",
          phone: "9800000001",
          address: "Kathmandu, Nepal",
          nidFront: "/uselessfoto/nidfront.png",
          nidBack: "/uselessfoto/nidback.png",
          addressProof: "/uselessfoto/address.png",
          status: "pending",
          appliedAt: "2025-07-12",
        },
      ]);
      

  const handleApprove = (id: string) => {
    alert("Approved " + id);
  };

  const handleReject = (id: string) => {
    alert("Rejected " + id);
  };

  return (
    <div>
      <h1>Seller Requests</h1>
      {requests.map((req) => (
        <SellerRequestCard
          key={req.id}
          request={req}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ))}
    </div>
  );
};

export default Requests;
