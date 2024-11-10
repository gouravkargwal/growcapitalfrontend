import * as yup from "yup";

import {
  LanguageState,
  fetchLanguages,
} from "@/Feature/Language/languageSlice";

import FormButton from "../UI/FormButton";
import GoogleAuthentication from "./GoogleAuthentication";
import Image from "next/image";
import InputField from "../UI/InputField";
import Link from "next/link";
import { RootState } from "@/Store/store";
import { signupUser } from "@/Feature/Auth/authSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthLayout from "./Layout";

// Validation schema
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
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: passwordStrength,
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  languageId: yup
    .number()
    .typeError("languageId must be a number")
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Language selection is required"),
  referralCode: yup.string().optional(),
});

type UserFormValue = yup.InferType<typeof formSchema>;

const SignupForm = ({ referralCode }: { referralCode: string | undefined }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { signupLoading } = useSelector((state: RootState) => state.auth);
  const { loading: languageLoading, data: languages } = useSelector<
    RootState,
    LanguageState
  >((state: RootState) => state.language);

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
      await signInWithEmailAndPassword(auth, data?.email, data?.password);
      router.push("/emailverification");
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-xl w-full p-6 sm:p-6 rounded-none md:rounded-lg shadow-none md:shadow-lg md:border md:border-gray-200">
        <button
          className="mb-4 text-primary hover:text-primary-dark"
          onClick={() => router.push("/")}
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-primary mb-4 text-left md:text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
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

          <InputField
            label="Email"
            type="email"
            register={register("email")}
            error={errors.email?.message}
            placeholder="yourname@gmail.com"
          />

          <InputField
            label="Password"
            type="password"
            register={register("password")}
            error={errors.password?.message}
            placeholder="********"
          />

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="mb-6">
              <label className="block text-textPrimary text-sm font-semibold mb-2">
                Language
              </label>
              <div className="relative">
                <select
                  {...register("languageId")}
                  className={`shadow-sm appearance-none border rounded-btn-lg w-full py-3 px-4 text-textPrimary leading-tight focus:outline-none focus:ring-2 ${errors.languageId
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                    }`}
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
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-red-500 text-xs italic mt-2">
                {errors.languageId?.message ?? ""}
              </p>
            </div>

            <div className="flex flex-col">
              <InputField
                label="Referral Code (optional)"
                type="text"
                register={register("referralCode")}
                error={errors.referralCode?.message}
                placeholder="Referral code"
              />
            </div>
          </div>
          <FormButton label="Continue" loading={signupLoading} />
          <p className="text-center text-gray-600 text-sm mt-3">
            Already have an account?{" "}
            <Link href="signin" className="text-accent hover:underline">
              Login
            </Link>
          </p>
        </form>
        <div className="mt-4">
          <GoogleAuthentication />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignupForm;
