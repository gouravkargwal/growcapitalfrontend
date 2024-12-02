"use client";

import SigninForm from "@/Components/Form/SigninForm";
import { logPageView } from "@/events/analytics";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => { logPageView() }, []);
  return <SigninForm />;
};

export default LoginPage;
