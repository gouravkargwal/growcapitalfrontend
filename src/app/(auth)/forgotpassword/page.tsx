"use client";

import ForgotPasswordForm from "@/Components/Form/ForgotPasswordForm";
import { logPageView } from "@/events/analytics";
import { useEffect } from "react";

const ForgotPasswordPage = () => {
  useEffect(() => { logPageView() }, []);
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
