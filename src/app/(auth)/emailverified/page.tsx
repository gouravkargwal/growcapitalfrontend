"use client";

import EmailVerification from "@/Components/Form/EmailVerificationForm";
import PasswordResetForm from "@/Components/Form/PasswordResetForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const EmailActionPage = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode"); // Get the mode (verifyEmail or resetPassword)

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-lg shadow-lg bg-white">
        {mode === "verifyEmail" && <EmailVerification />}
        {mode === "resetPassword" && <PasswordResetForm />}
      </div>
    </div>
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
