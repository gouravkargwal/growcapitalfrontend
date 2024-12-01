"use client";

import { useEffect } from "react";
import Dashboard from "@/Components/Dashboard/Dashboard";
import { logPageView } from "@/events/analytics";

const DashboardPage = () => {
  useEffect(() => {
    logPageView();
  }, []);
  return <Dashboard />;
};

export default DashboardPage;
