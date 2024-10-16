"use client";

import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import FormButton from "@/Components/UI/FormButton";

const VerifyEmailPage = () => {
  const router = useRouter();
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.emailVerified) {
      router.push("/signin"); // Redirect to login page if email is already verified
    }
  }, [router]);

  const handleResendVerification = async () => {
    setResendLoading(true);
    setError(null); // Reset error state
    try {
      const user = auth.currentUser;
      console.log(user);

      if (user) {
        await sendEmailVerification(user);
        alert("Verification email sent. Please check your inbox."); // Notify user
      }
    } catch (error: any) {
      console.error("Error resending email verification", error);
      setError(error.message); // Set error message for user feedback
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Image Section (hidden on mobile, shown on md and larger) */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gray-900 text-white items-center justify-center">
        <div className="text-center p-8">
          <img
            src="https://via.placeholder.com/600x300"
            alt="Dashboard Overview"
            className="w-full h-auto mb-4 rounded-lg"
          />
          <div className="bg-black p-8 rounded-lg">
            <h2 className="text-4xl font-semibold text-white mb-4">Finlab</h2>
            <p className="text-lg text-gray-300 mb-6">
              Let’s empower your financial task today with Findash.
            </p>
            <p className="text-gray-400 mb-6">
              The one-stop platform for all financial management of small and
              medium-sized businesses.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full h-screen md:w-1/2 flex justify-center items-center">
        <div className="max-w-md w-full p-6 sm:p-8 rounded-lg shadow-lg bg-white text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Verify Your Email
          </h1>
          <p className="text-gray-600 mb-6">
            We've sent you an email with a link to verify your account. Please
            check your inbox.
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Resend Verification Button */}
          <FormButton
            label={resendLoading ? "Resending..." : "Resend Verification Email"}
            onClick={handleResendVerification}
            loading={resendLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
