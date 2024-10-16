import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import InputField from "../UI/InputField";
import FormButton from "../UI/FormButton";

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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Image Section */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gray-900 text-white items-center justify-center">
        <div className="text-center p-8">
          <img
            src="https://via.placeholder.com/600x300"
            alt="Dashboard Overview"
            className="w-full h-auto mb-4 rounded-lg"
          />
          <div className="bg-black p-8 rounded-lg">
            <h2 className="text-4xl font-semibold text-white mb-4">Finlab</h2>
            <p className="text-lg text-gray-300 mb-6">
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
        <div className="max-w-md w-full p-6 sm:p-8 rounded-lg shadow-lg bg-white">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Forgot Password
          </h2>
          {successMessage && (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
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
              <Link href="/signin" className="text-green-500">
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
