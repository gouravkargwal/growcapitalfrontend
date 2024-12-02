"use client";
import NewsList from "@/Components/timeline/NewsList";
import { logPageView } from "@/events/analytics";
import React, { useEffect } from "react";

const YourTimeLine: React.FC = () => {
  useEffect(() => { logPageView() }, []);
  return <NewsList />;
};

export default YourTimeLine;
