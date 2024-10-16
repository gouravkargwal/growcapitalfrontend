"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { applyActionCode, sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { verifyEmail } from "@/Feature/Auth/authSlice";
import FormButton from "@/Components/UI/FormButton";

const EmailVerification = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode"); // Get the verification code from the URL

  const [error, setError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "verified" | "not_verified"
  >("pending");

  useEffect(() => {
    const emailVerification = async () => {
      if (oobCode) {
        try {
          await applyActionCode(auth, oobCode);
          const user = auth.currentUser; // Get the current user
          if (user) {
            dispatch(verifyEmail(user.uid));
            setVerificationStatus("verified"); // Set status to verified
            router.push("/signin"); // Redirect to login after successful verification
          }
        } catch (error: any) {
          console.error("Error verifying email", error);
          setError(error.message); // Set error message for user feedback
          setVerificationStatus("not_verified"); // Set status to not verified
        }
      }
    };

    emailVerification();
  }, [oobCode, router, dispatch]);

  const handleResendVerification = async () => {
    console.log("Hello");

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
      setError("Failed to resend verification email. Please try again."); // Set a generic error message
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Verify Your Email
      </h2>

      {verificationStatus === "verified" ? (
        <p className="text-lg font-semibold text-green-600 mb-4">
          Email Verified Successfully
        </p>
      ) : verificationStatus === "not_verified" ? (
        <p className="text-lg font-semibold text-red-600 mb-4">
          Email verification failed. Please try again.
        </p>
      ) : null}

      {!auth.currentUser?.emailVerified && (
        <FormButton
          label={resendLoading ? "Resending..." : "Resend Verification Email"}
          loading={resendLoading}
          onClick={handleResendVerification}
        />
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default EmailVerification;
