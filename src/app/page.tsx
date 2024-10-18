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
    <>
      <PublicNavbar />
      <Hero />
      <Features />
      <Reviews />
      <PricingSection />
      <Trial />
      <Faqs />
      <Footer />
    </>
  );
};

export default Home;
