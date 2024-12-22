"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useState, useEffect } from "react";

const WhatsAppSetupPage = () => {
  const [currentScreen, setCurrentScreen] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [resendTimer, setResendTimer] = useState<number>(60);

  // Validate phone number input
  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setError("Phone number is required.");
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit Indian phone number.");
      return false;
    }
    return true;
  };

  // Validate OTP input
  const validateOtp = () => {
    if (!verificationCode) {
      setError("OTP is required.");
      return false;
    }
    if (!/^\d{6}$/.test(verificationCode)) {
      setError("OTP must be a 6-digit number.");
      return false;
    }
    return true;
  };

  // Handle phone number submission
  const handlePhoneNumberSubmit = () => {
    setError("");
    setSuccess("");

    if (!validatePhoneNumber()) return;

    setCurrentScreen("otp");
    setResendTimer(60); // Reset resend timer
  };

  // Send OTP
  const sendOtp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/otp/send", {
        phoneNumber: `+91${phoneNumber}`,
      });

      if (response.data.success) {
        setSuccess("OTP sent to your phone!");
      } else {
        setError(response.data.message || "Failed to send OTP. Try again.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically send OTP when OTP screen loads
  useEffect(() => {
    if (currentScreen === "otp") {
      sendOtp();
    }
  }, [currentScreen]);

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    if (!validateOtp()) return;

    setLoading(true);

    try {
      const response = await axiosInstance.post("/otp/verify", {
        phoneNumber: `+91${phoneNumber}`,
        otp: verificationCode,
      });

      if (response.data.success) {
        setSuccess("Phone number verified successfully!");
        setConfirmed(true);
      } else {
        setError(response.data.message || "Failed to verify the OTP. Try again.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to verify the OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend timer countdown
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

  // Confirmed screen
  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Number Confirmed</h1>
          <p className="text-gray-600">
            Your phone number <strong>+91{phoneNumber}</strong> has been successfully verified and linked to your account.
          </p>
        </div>
      </div>
    );
  }

  // Phone number input screen
  if (currentScreen === "phone") {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Set Up Your WhatsApp Number</h1>
          <p className="text-gray-600 mb-6">Please enter your Indian phone number:</p>

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

          <button
            onClick={handlePhoneNumberSubmit}
            className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition duration-300"
          >
            Next
          </button>

          {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
        </div>
      </div>
    );
  }

  // OTP verification screen
  if (currentScreen === "otp") {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Verify OTP</h1>
          <p className="text-gray-600 mb-6">
            Please enter the OTP sent to <strong>+91{phoneNumber}</strong>:
          </p>

          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
            className="border rounded-lg py-2 px-4 mb-4 w-full focus:outline-none"
            placeholder="Enter the verification code"
            maxLength={6}
          />

          <button
            onClick={handleVerifyOtp}
            className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-accent transition duration-300"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>

          {resendTimer > 0 ? (
            <p className="text-gray-500 mt-2">
              Resend OTP in {Math.floor(resendTimer / 60)}:{String(resendTimer % 60).padStart(2, "0")}
            </p>
          ) : (
            <button
              onClick={sendOtp}
              className="mt-4 text-primary hover:underline"
              disabled={loading}
            >
              Resend OTP
            </button>
          )}

          {success && <p className="mt-4 text-green-600 font-semibold">{success}</p>}
          {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
        </div>
      </div>
    );
  }

  return null;
};

export default WhatsAppSetupPage;
