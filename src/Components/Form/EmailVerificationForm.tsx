"use client";

import { applyActionCode, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FormButton from "@/Components/UI/FormButton";
import { auth } from "@/lib/firebase";
import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { verifyEmail } from "@/Feature/Auth/authSlice";

const EmailVerification = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode"); // Get the verification code from the URL

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
          dispatch(openSnackbar({ message: error.message, status: "error" }));
          setVerificationStatus("not_verified"); // Set status to not verified
        }
      }
    };

    emailVerification();
  }, [oobCode, router, dispatch]);

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        alert("Verification email sent. Please check your inbox."); // Notify user
      }
    } catch (error: any) {
      console.error("Error resending email verification", error);
      dispatch(
        openSnackbar({
          message: "Failed to resend verification email. Please try again.",
          status: "error",
        })
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-lg shadow-lg bg-white border border-gray-200">
        <h2 className="text-3xl font-extrabold text-primary mb-6 text-center">
          Verify Your Email
        </h2>

        {verificationStatus === "verified" ? (
          <p className="text-lg font-semibold text-green-600 mb-4 text-center">
            Email Verified Successfully
          </p>
        ) : verificationStatus === "not_verified" ? (
          <p className="text-lg font-semibold text-red-600 mb-4 text-center">
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
      </div>
    </div>
  );
};

export default EmailVerification;
