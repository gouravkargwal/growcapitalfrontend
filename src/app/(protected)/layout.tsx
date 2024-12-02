"use client";

import PrivateNavbar from "@/Components/Dashboard/PrivateNavbar";
import Sidebar from "@/Components/Dashboard/Sidebar";
import FreshdeskWidget from "@/Components/help/freshdesk";
import useAuthGuard from "@/hook/useAuthGuard";
import { useState } from "react";

export default function ProtectedLayout({
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
      <div className="hidden lg:block lg:w-64 h-full">
        <Sidebar closeSidebar={closeSidebar} />
      </div>
      <div
        className={`fixed inset-0 z-50 flex lg:hidden transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="w-64 h-full bg-white shadow-lg">
          <Sidebar closeSidebar={closeSidebar} />
        </div>
        <div
          className={`flex-1 bg-black transition-opacity ${isSidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
            }`}
          onClick={closeSidebar}
        />
      </div>
      <div className="flex flex-col flex-1 h-screen">
        <PrivateNavbar toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-x-hidden">{children}</div>
      </div>
      <FreshdeskWidget />
    </div>
  );
}
