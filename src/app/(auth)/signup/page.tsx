"use client";

import SignupForm from "@/Components/Form/SignupForm";
import { logPageView } from "@/events/analytics";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referralCode");
  return <SignupForm referralCode={referralCode || undefined} />;
};

export default function Signup() {
  useEffect(() => { logPageView() }, []);
  return (
    <Suspense fallback={<div>Loading signup...</div>}>
      <SignUpPage />
    </Suspense>
  );
}
