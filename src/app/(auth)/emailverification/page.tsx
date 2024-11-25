"use client";

import { useEffect, useState } from "react";

import FormButton from "@/Components/UI/FormButton";
import { auth } from "@/lib/firebase";
import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import { sendEmailVerification } from "firebase/auth";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useRouter } from "next/navigation";
import AuthLayout from "@/Components/Form/Layout";

const VerifyEmailPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      router.push("/signin");
    }
  }, [router]);

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await sendEmailVerification(user);
        dispatch(
          openSnackbar({
            message: "Verification email sent. Please check your inbox.",
            severity: "success",
          })
        );
      }
    } catch (error: any) {
      dispatch(openSnackbar({ message: error.message, severity: "error" }));
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-xl w-full p-6 sm:p-8 rounded-lg shadow-lg bg-white text-center">
        <h1 className="text-3xl font-extrabold text-primary mb-6">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          We've sent you an email with a link to verify your account. Please
          check your inbox.
        </p>

        {/* Resend Verification Button */}
        <FormButton
          label={resendLoading ? "Resending..." : "Resend Verification Email"}
          onClick={handleResendVerification}
          loading={resendLoading}
        />
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
