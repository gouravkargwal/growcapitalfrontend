"use client";

import Faqs from "@/Components/Home/Faqs";
import Features from "@/Components/Home/Features";
import Footer from "../Components/Header/Footer";
import Hero from "@/Components/Home/Hero";
import PricingSection from "@/Components/Home/Pricing";
import PublicNavbar from "../Components/Header/PublicNavbar";
import React from "react";
import Reviews from "@/Components/Home/Reviews";
import Trial from "@/Components/Home/Trial";

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-white">
      <PublicNavbar />
      <Hero />
      <Features />
      <Reviews />
      <PricingSection />
      <Trial />
      <Faqs />
      <Footer />
    </div>
  );
};

export default Home;
