import React from "react";
import NavbarDemo from "../components/NavbarDemo";
import { ServicesSection } from "../components/ServicesSection";

const Dashboard = () => {
  return (
    <div>
      <NavbarDemo />
      <div className="w-full">
        <ServicesSection />
      </div>
    </div>
  );
};

export default Dashboard;
