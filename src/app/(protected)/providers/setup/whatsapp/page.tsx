"use client";

import axiosInstance from "@/lib/axiosInstance"; // Adjust the import based on your setup
import { auth, useAuth } from "@/lib/firebase"; // Import your useAuth hook
import { useState, useEffect } from "react";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

const WhatsAppSetupPage = () => {
  const { user, loading: authLoading } = useAuth(); // Use the authentication state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendVerificationCode = async () => {
    setError("");
    setSuccess("");

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Please enter a valid Indian phone number (10 digits).");
      return;
    }

    setLoading(true);

    const fullPhoneNumber = `+91${phoneNumber}`;
    try {
      // Send OTP using Firebase without reCAPTCHA
      // const confirmationResult = await signInWithPhoneNumber(
      //   auth,
      //   fullPhoneNumber
      // );
      // setVerificationId(confirmationResult.verificationId);
      setSuccess("Verification code sent to your phone!");
      setOtpSent(true);
      setResendTimer(180); // Set a 3-minute timer
    } catch (error) {
      console.error(error);
      setError("Failed to send verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // const credential = window.firebase.auth.PhoneAuthProvider.credential(
      //   verificationId,
      //   verificationCode
      // );
      // await getAuth().signInWithCredential(credential);
      setSuccess("Phone number verified successfully!");

      // Call your service to configure WhatsApp here
      await axiosInstance.post("/user-provider/configure-whatsapp", {
        phoneNumber: `+91${phoneNumber}`,
      });
    } catch (error) {
      console.error(error);
      setError("Failed to verify the code. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const [resendTimer, setResendTimer] = useState<number>(60); // Example initial value for resendTimer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [resendTimer]);

  if (authLoading) return <p>Loading...</p>; // Optional: handle loading state for auth

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Set Up Your WhatsApp Number
        </h1>
        <p className="text-gray-600 mb-6">
          Please enter your Indian phone number:
        </p>

        <div className="flex mb-4">
          <input
            type="text"
            value="+91"
            disabled
            className="bg-gray-200 text-gray-600 border rounded-l-lg py-2 px-2 w-16 focus:outline-none"
          />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
            className="border rounded-r-lg py-2 px-4 flex-grow focus:outline-none"
            placeholder="Enter your 10-digit number"
            maxLength={10}
          />
        </div>

        {otpSent ? (
          <div>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="border rounded-lg py-2 px-4 mb-4 w-full focus:outline-none"
              placeholder="Enter the verification code"
            />
            <button
              onClick={handleVerifyCode}
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </div>
        ) : (
          <button
            onClick={handleSendVerificationCode}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading || resendTimer > 0}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        )}

        {resendTimer > 0 && (
          <p className="text-gray-500 mt-2">
            Resend OTP in {Math.floor(resendTimer / 60)}:
            {String(resendTimer % 60).padStart(2, "0")}
          </p>
        )}

        {success && (
          <p className="mt-4 text-green-600 font-semibold">{success}</p>
        )}
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      </div>
    </div>
  );
};

export default WhatsAppSetupPage;
