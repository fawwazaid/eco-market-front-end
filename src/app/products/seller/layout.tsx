// src/app/products/seller/layout.tsx
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const SellerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <Navbar />
      <main className="p-4 mt-10">{children}</main>
    </div>
  );
};

export default SellerLayout;
