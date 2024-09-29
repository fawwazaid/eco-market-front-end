import React from "react";
import Navbar from "../../components/Navbar";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </>
  );
};

export default AboutLayout;
