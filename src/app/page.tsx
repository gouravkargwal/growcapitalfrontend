"use client";
import React from "react";
import PricingSection from "../Components/Home/Pricing";
import Faqs from "../Components/Home/Faqs";
import Trial from "../Components/Home/Trial";
import Footer from "../Components/Header/Footer";
import Hero from "@/Components/Home/Hero";
import PublicNavbar from "../Components/Header/PublicNavbar";
import Features from "@/Components/Home/Features";
import Reviews from "@/Components/Home/Reviews";

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
