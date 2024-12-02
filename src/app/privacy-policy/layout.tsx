"use client";

import Navbar from "@/Components/Header/PublicNavbar";
import Footer from "@/Components/Header/Footer";
import { useEffect } from "react";
import { logPageView } from "@/events/analytics";

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => { logPageView() }, []);
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
