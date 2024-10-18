"use client";

import * as yup from "yup";

import { useRouter, useSearchParams } from "next/navigation";

import FormButton from "@/Components/UI/FormButton";
import InputField from "@/Components/UI/InputField";
import { auth } from "@/lib/firebase";
import { confirmPasswordReset } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

// Password validation schema with strength checks
const passwordStrength = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[@$!%*?&]/, "Password must contain at least one special character");

// Schema for password and confirm password fields
const formSchema = yup.object().shape({
  password: passwordStrength,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

type FormValues = {
  password: string;
  confirmPassword: string;
};

const PasswordResetForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      if (oobCode) {
        await confirmPasswordReset(auth, oobCode, data.password);
        router.push("/signin");
      }
    } catch (err: any) {
      setError("Failed to reset password. Please try again.");
      console.error("Password reset error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 bg-white">
        <h2 className="text-3xl font-extrabold text-primary mb-6 text-center">
          Reset Your Password
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Password Field */}
          <div className="relative mb-4">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              register={register("password")}
              error={errors.password?.message}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative mb-4">
            <InputField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <FormButton
            label="Reset Password"
            loading={loading}
            className="w-full bg-primary hover:bg-accent text-white py-3 rounded-btn-lg shadow-btn-shadow transition-all duration-300 ease-in-out"
          />
        </form>
      </div>
    </div>
  );
};

export default PasswordResetForm;
