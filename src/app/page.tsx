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

const Home: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route in Next.js App Router
  const { user, loading } = useAuth(); // Use your hook to get auth state

  useEffect(() => {
    if (loading) return; // Wait until loading is complete

    // Redirect to dashboard only if user is authenticated and on the public landing page
    if (user && pathname === "/") {
      router.push("/dashboard");
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
