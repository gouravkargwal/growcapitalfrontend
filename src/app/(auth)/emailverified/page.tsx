"use client";

import EmailVerification from "@/Components/Form/EmailVerificationForm";
import PasswordResetForm from "@/Components/Form/PasswordResetForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const EmailActionPage = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode"); // Get the mode (verifyEmail or resetPassword)

  return (
    <>
      {mode === "verifyEmail" && <EmailVerification />}
      {mode === "resetPassword" && <PasswordResetForm />}
    </>
  );
};

// Export the Signup component wrapped with Suspense
export default function EmailVerified() {
  return (
    <Suspense fallback={<div>Loading signup...</div>}>
      <EmailActionPage />
    </Suspense>
  );
}
