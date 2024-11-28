import * as yup from "yup";

import { FirebaseError } from "firebase/app";
import FormButton from "../UI/FormButton";
import Image from "next/image";
import InputField from "../UI/InputField";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthLayout from "./Layout";

// Validation schema for email
const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

type UserFormValue = yup.InferType<typeof formSchema>;

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValue>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      // Trigger Firebase to send a password reset email
      await sendPasswordResetEmail(auth, data.email);
      setSuccessMessage("Password reset email has been sent!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("No user found with this email.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid email address.");
            break;
          default:
            setErrorMessage(
              "Error sending reset email. Please try again later."
            );
            break;
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-xl w-full p-6 sm:p-8 rounded-lg shadow-lg bg-white border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          Forgot Password
        </h2>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email"
            register={register("email")}
            type="email"
            placeholder="yourname@gmail.com"
            error={errors.email?.message}
          />

          <FormButton label="Send Reset Email" loading={loading} />

          <p className="text-center text-gray-600 mt-4">
            Remembered your password?{" "}
            <Link href="/signin" className="text-accent hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordForm;
