"use client";

import EmailVerification from "@/Components/Form/EmailVerificationForm";
import PasswordResetForm from "@/Components/Form/PasswordResetForm";
import { useSearchParams } from "next/navigation";

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

export default EmailActionPage;
