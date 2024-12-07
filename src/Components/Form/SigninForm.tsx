import * as yup from "yup";

import FormButton from "../UI/FormButton";
import GoogleAuthentication from "./GoogleAuthentication";
import Image from "next/image";
import InputField from "../UI/InputField";
import Link from "next/link";
import { RootState } from "@/Store/store";
import { auth } from "@/lib/firebase";
import { checkPasswordChange, signInUser } from "@/Feature/Auth/authSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import AuthLayout from "./Layout";
import { backClicked, forgotClicked, registerClicked, signInclicked, signInFail, signInSucces } from "@/events/auth/signin-events";
import { logEvent } from "@/events/analytics";

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
});

type UserFormValue = yup.InferType<typeof formSchema>;

const SigninForm = () => {
  const back = backClicked("signin");
  const signIn = signInclicked();
  const success = signInSucces();
  const fail = signInFail();
  const forgot = forgotClicked();
  const registerEvent = registerClicked();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { signinLoading } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValue>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: UserFormValue) => {
    logEvent(signIn);
    const forcePassword = await dispatch(checkPasswordChange(data?.email));
    if (checkPasswordChange.fulfilled.match(forcePassword)) {
      const x = forcePassword?.payload?.data;
      if (x) {
        router.push("/forgotpassword");
        return dispatch(
          openSnackbar({
            message: "Please reset your password",
            severity: "error",
          })
        );
      } else {
        const result = await dispatch(signInUser(data));
        if (signInUser.fulfilled.match(result)) {
          const user = result.payload.user;
          if (user) {
            router.replace("/dashboard");
            logEvent(success);
          }
        } else {
          await auth.signOut();
          logEvent(fail);
        }
      }
    } else {
      logEvent(fail);
      return dispatch(
        openSnackbar({ message: "Internal Server Error", severity: "error" })
      );
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-xl w-full p-6 sm:p-8 rounded-none md:rounded-lg shadow-none md:shadow-lg md:border md:border-gray-200">
        <button
          className="mb-4 hover:text-primary-dark"
          onClick={() => { router.push("/"); logEvent(back) }}
        >
          ← Back
        </button>
        <h2 className="text-4xl font-extrabold mb-6 md:text-center text-left">
          Sign in
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email"
            register={register("email")}
            type="email"
            placeholder="yourname@gmail.com"
            error={errors.email?.message}
          />
          <InputField
            label="Password"
            type="password"
            register={register("password")}
            placeholder="********"
            error={errors.password?.message}
          />
          <div className="text-right mb-2">
            <Link
              href="forgotpassword"
              className="text-sm text-primary hover:underline"
              onClick={() => logEvent(forgot)}
            >
              Forgot Password?
            </Link>
          </div>
          <FormButton label="Continue" loading={signinLoading} />
          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link href="signup" className="text-accent hover:underline" onClick={() => logEvent(registerEvent)}>
              Register
            </Link>
          </p>
        </form>
        <div className="mt-6">
          <GoogleAuthentication />
        </div>
      </div >
    </AuthLayout >
  );
};

export default SigninForm;
