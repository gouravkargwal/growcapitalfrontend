"use client";

import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import FormButton from "@/Components/UI/FormButton";
import InputField from "@/Components/UI/InputField";
import { auth } from "@/lib/firebase";
import { checkActionCode, confirmPasswordReset } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { confirmPassword } from "@/Feature/Auth/authSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons
import AuthLayout from "./Layout";

// Password validation schema with strength checks
const passwordStrength = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[@$!%*?&,><]/,
    "Password must contain at least one special character"
  );

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const dispatch = useAppDispatch();

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
        const actionCodeInfo = await checkActionCode(auth, oobCode);
        const email = actionCodeInfo.data.email;
        if (email) {
          await confirmPasswordReset(auth, oobCode, data.password);
          await dispatch(confirmPassword(email));
          dispatch(
            openSnackbar({
              message: "Password changed successfully.",
              severity: "success",
            })
          );
          router.push("/signin");
        }
      }
    } catch (err: any) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-xl w-full p-6 sm:p-8 rounded-lg shadow-lg bg-white border border-gray-200">
        <h2 className="text-3xl font-extrabold text-primary mb-6 text-center">
          Reset Your Password
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Password Field */}
          <div className="relative mb-6">
            <InputField
              label="New Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              register={register("password")}
              error={errors.password?.message}
            />
            <button
              type="button"
              className="absolute right-4 top-10 text-gray-500 text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative mb-6">
            <InputField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            <button
              type="button"
              className="absolute right-4 top-10 text-gray-500 text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <FormButton label="Reset Password" loading={loading} />
        </form>
      </div>
    </AuthLayout>
  );
};

export default PasswordResetForm;
