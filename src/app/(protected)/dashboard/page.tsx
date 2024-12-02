"use client";
import Dashboard from "@/Components/Dashboard/Dashboard";
import { logPageView } from "@/events/analytics";
import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => { logPageView() }, []);
  return <Dashboard />;
};

export default DashboardPage;
