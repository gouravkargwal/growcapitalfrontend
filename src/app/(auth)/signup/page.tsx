"use client";

import SignupForm from "@/Components/Form/SignupForm";
import { useSearchParams } from "next/navigation";

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referralCode"); // Extract referralCode from search params
  console.log(referralCode, "Eeferal code in signup");

  return <SignupForm referralCode={referralCode || undefined} />;
};

export default SignUpPage;
