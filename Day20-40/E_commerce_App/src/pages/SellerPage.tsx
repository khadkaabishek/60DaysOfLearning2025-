// src/pages/SellerPage.tsx
import React from "react";
import SellerPageLayout from "../components/SellerPageLayout";
import HeroSection from "../components/HeroSection";
import WhySellWithUs from "../components/WhySellWithUs";
import SellerBenefits from "../components/SellerBenefits";
import BecomeSellerForm from "../components/BecomeSellerForm";
import FAQSection from "../components/FAQSection";

const SellerPage: React.FC = () => {
  return (
    <SellerPageLayout>
      <HeroSection />
      <WhySellWithUs />
      <SellerBenefits />
      <BecomeSellerForm />
      <FAQSection />
    </SellerPageLayout>
  );
};

export default SellerPage;
