"use client";

import Faqs from "@/Components/Home/Faqs";
import Features from "@/Components/Home/Features";
import Footer from "../Components/Header/Footer";
import Hero from "@/Components/Home/Hero";
import PricingSection from "@/Components/Home/Pricing";
import PublicNavbar from "../Components/Header/PublicNavbar";
import React, { useEffect } from "react";
import Reviews from "@/Components/Home/Reviews";
import Trial from "@/Components/Home/Trial";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase";
import { logPageView } from "@/events/analytics";

const Home: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  useEffect(() => { logPageView() }, []);
  useEffect(() => {
    if (loading) return;

    if (user && pathname === "/") {
      router.replace("/dashboard");
    }
  }, [user, loading, router, pathname]);

  return (
    <div className="bg-tertiary">
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
