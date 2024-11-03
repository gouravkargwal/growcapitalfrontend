"use client";

import PrivateNavbar from "@/Components/Dashboard/PrivateNavbar";
import Sidebar from "@/Components/Dashboard/Sidebar";
import FreshdeskWidget from "@/Components/help/freshdesk";
import useAuthGuard from "@/hook/useAuthGuard";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const { user, loading } = useAuthGuard();
  if (loading) {
    <h1>Loading...</h1>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-row">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block lg:w-64 h-full">
        <Sidebar closeSidebar={closeSidebar} />
      </div>

      {/* Mobile Sidebar with animation */}
      <div
        className={`fixed inset-0 z-50 flex lg:hidden transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 h-full bg-white shadow-lg">
          <Sidebar closeSidebar={closeSidebar} />
        </div>
        {/* Overlay with fade-in/fade-out effect */}
        <div
          className={`flex-1 bg-black transition-opacity ${
            isSidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeSidebar}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Navbar with toggle button */}
        <nav className="bg-white shadow-md p-4 flex justify-between items-center lg:hidden">
          <button
            onClick={toggleSidebar}
            className="text-xl focus:outline-none"
          >
            ☰ {/* Hamburger icon */}
          </button>
          <h1 className="text-lg font-bold text-blue-700">Grow Capital</h1>
        </nav>

        <div className="flex flex-col flex-1 h-screen">
          {/* Navbar with dynamic title */}
          <PrivateNavbar toggleSidebar={toggleSidebar} />

          {/* Main Content */}
          <div className="flex-1 overflow-auto">{children}</div>
          <FreshdeskWidget />
        </div>
      </div>
    </div>
  );
}
