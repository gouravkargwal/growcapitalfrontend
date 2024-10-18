"use client";

import Sidebar from "@/Components/Dashboard/sidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  // const { user, loading } = useAuthGuard();
  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }
  // if (!user) {
  //   return null;
  // }
  return (
    <div className="min-h-screen flex flex-row">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block lg:w-64 h-full">
        <Sidebar closeSidebar={closeSidebar} />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 h-full bg-white shadow-lg">
            <Sidebar closeSidebar={closeSidebar} />
          </div>
          {/* Overlay */}
          <div className="flex-1 bg-black opacity-50" onClick={closeSidebar} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Navbar with toggle button */}
        <div className="p-4 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="text-xl focus:outline-none"
          >
            ☰ {/* Hamburger icon */}
          </button>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
