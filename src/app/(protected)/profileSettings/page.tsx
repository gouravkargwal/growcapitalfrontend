"use client";
import React, { useEffect } from "react";
import UserInfo from "@/Components/ProfileSetting/UserInfo";
import { logPageView } from "@/events/analytics";

const ProfileSettings = () => {
  useEffect(() => { logPageView() }, []);
  return (
    <div className="container mx-auto p-6">
      <UserInfo />
    </div>
  );
};

export default ProfileSettings;
