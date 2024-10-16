import * as yup from "yup";

import { useEffect, useState } from "react";

import FormButton from "../UI/FormButton";
import GoogleAuthentication from "./GoogleAuthentication";
import InputField from "../UI/InputField";
import Link from "next/link";
import { RootState } from "@/Store/store";
import { fetchLanguages } from "@/Feature/Language/languageSlice";
import { signupUser } from "@/Feature/Auth/authSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

const passwordStrength = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[@$!%*?&]/, "Password must contain at least one special character");

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: passwordStrength,
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  languageId: yup.number().required("Language selection is required"),
  referralCode: yup.string().optional(),
});

type UserFormValue = yup.InferType<typeof formSchema>;

const SignupForm = ({ referralCode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { signupLoading } = useSelector((state: RootState) => state.auth);
  const { loading: languageLoading, data: languages } = useSelector(
    (state: RootState) => state.language
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValue>({
    defaultValues: {
      referralCode: referralCode,
    },
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  const onSubmit = async (data: UserFormValue) => {
    const resultAction = await dispatch(
      signupUser({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        password: data?.password,
        languageId: data?.languageId,
        referredByCode: data?.referralCode,
      })
    );
    if (signupUser.fulfilled.match(resultAction)) {
      // await sendEmailVerification(userCredential.user);
      router.push("/emailverification");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Image Section */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gray-900 text-white items-center justify-center">
        <div className="text-center p-8">
          <img
            src="https://via.placeholder.com/600x300"
            alt="Signup Image"
            className="w-full h-auto mb-4 rounded-lg"
          />
          <div className="bg-black p-8 rounded-lg">
            <h2 className="text-4xl font-semibold text-white mb-4">Join Us!</h2>
            <p className="text-lg text-gray-300 mb-6">
              Start your journey with our platform and explore new
              opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full h-screen md:w-1/2 flex justify-center items-center h-full">
        <div className="max-w-md w-full p-6 sm:p-8 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name and Last Name in One Line */}
            <div className="flex space-x-4">
              <InputField
                label="First Name"
                type="text"
                register={register("firstName")}
                error={errors.firstName?.message}
                placeholder="First Name"
              />
              <InputField
                label="Last Name"
                type="text"
                register={register("lastName")}
                error={errors.lastName?.message}
                placeholder="Last Name"
              />
            </div>

            {/* Email */}
            <InputField
              label="Email"
              type="email"
              register={register("email")}
              error={errors.email?.message}
              placeholder="Email"
            />

            {/* Password */}
            <InputField
              label="Password"
              type="password"
              register={register("password")}
              error={errors.password?.message}
              placeholder="Password"
            />

            {/* Language Selection */}
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  {...register("languageId")}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={languageLoading}
                >
                  <option value="">Select Language</option>
                  {languageLoading ? (
                    <option disabled>Loading languages...</option>
                  ) : (
                    languages?.map((lang) => (
                      <option key={lang.languageId} value={lang.languageId}>
                        {lang.languageName}
                      </option>
                    ))
                  )}
                </select>
                <p className="text-red-600 text-sm mt-1 m-2">
                  {errors.languageId?.message}
                </p>
              </div>
              <InputField
                label="Referral Code (optional)"
                type="text"
                register={register("referralCode")}
                error={errors.referralCode?.message}
                placeholder="Enter referral code"
              />
            </div>

            {/* Submit Button */}
            <FormButton label="Continue" loading={signupLoading} />

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link href="signin" className="text-green-500">
                Login
              </Link>
            </p>
          </form>
          <GoogleAuthentication />
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
