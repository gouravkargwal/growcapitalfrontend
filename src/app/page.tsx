"use client";
import React, { useRef, useEffect, useState } from "react";
import PricingSection from "../Components/Home/pricing";
import Faqs from "../Components/Home/faqs";
import Trial from "../Components/Home/trial";
import Reviews from "../Components/Home/reviews";
import Features from "../Components/Home/features";
import Footer from "../Components/common/footer";
import Navbar from "../Components/common/navbar";
import Hero from "@/Components/Home/Hero";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
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
