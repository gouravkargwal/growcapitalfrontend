"use client";

import Navbar from "@/Components/Header/PublicNavbar";
import Footer from "@/Components/Header/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
