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

// Validation schema for email
const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

type UserFormValue = yup.InferType<typeof formSchema>;

const ForgotPasswordForm = () => {
  const router = useRouter();
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
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      {/* Image Section */}
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
      <div className="w-full h-screen md:w-1/2 flex justify-center items-center">
        <div className="max-w-md w-full p-6 sm:p-8 rounded-lg shadow-lg bg-white border border-gray-200">
          <h2 className="text-3xl font-extrabold text-primary mb-6 text-center">
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
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
