"use client";

import { useEffect, useState } from "react";

import FormButton from "@/Components/UI/FormButton";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import { sendEmailVerification } from "firebase/auth";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useRouter } from "next/navigation";

const VerifyEmailPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.emailVerified) {
      router.push("/signin"); // Redirect to login page if email is already verified
    }
  }, [router]);

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      const user = auth.currentUser;

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
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      {/* Image Section (hidden on mobile, shown on md and larger) */}
      <div className="hidden h-screen md:flex w-full md:w-1/2 bg-gradient-to-r from-primary to-blue-600 text-white items-center justify-center">
        <div className="text-center p-8">
          <Image
            src="https://via.placeholder.com/600x300"
            alt="Dashboard Overview"
            width={600}
            height={300}
            className="w-full h-auto mb-4 rounded-lg shadow-lg"
          />
          <div className="bg-black bg-opacity-30 p-8 rounded-lg shadow-md backdrop-blur-md">
            <h2 className="text-4xl font-semibold text-white mb-4">Finlab</h2>
            <p className="text-lg text-gray-100 mb-6">
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
      <div className="w-full md:w-1/2 h-screen flex justify-center items-center">
        <div className="max-w-md w-full p-6 sm:p-8 rounded-lg shadow-lg bg-white text-center">
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
      </div>
    </div>
  );
};

export default VerifyEmailPage;
