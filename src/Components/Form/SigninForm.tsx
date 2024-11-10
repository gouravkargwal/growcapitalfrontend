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
import bg from "../../../assets/home.png";

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
    const forcePassword = await dispatch(checkPasswordChange(data?.email));
    if (checkPasswordChange.fulfilled.match(forcePassword)) {
      console.log(forcePassword);
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
          if (user?.emailVerified) {
            router.push("/dashboard");
          } else {
            router.push("/emailverification");
          }
        } else {
          await auth.signOut();
        }
      }
    } else {
      return dispatch(
        openSnackbar({ message: "Internal Server Error", severity: "error" })
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex w-full md:w-[50%] bg-primary text-white flex-col">
        <div className="w-full  pt-14 pl-16">
          <Image
            src={bg}
            alt="Dashboard Overview"
            layout="responsive"
            width={600}
            height={300}
            className="w-full h-1/2 mb-0 object-fill rounded-tl-2xl"
          />
        </div>
        <div className="w-full bg-black bg-opacity-30 p-8 backdrop-blur-md text-start h-full">
          <h2 className="text-4xl  text-white mb-10">Grow Capital</h2>
          <p className="text-4xl text-gray-100 font-semibold mb-10">
            Stay Ahead with Real-Time Stock News
          </p>
          <p className="text-gray-200">
            🌐 Stay ahead with real-time BSE updates! 100-word summaries 🗣️, add/remove stocks, stay informed! 📲
          </p>
        </div>
      </div>
      <div className="w-full h-screen md:w-1/2 flex justify-center items-center bg-gray-50">
        <div className="max-w-xl w-full p-6 sm:p-8 rounded-none md:rounded-lg shadow-none md:shadow-lg md:border md:border-gray-200">
          <button
            className="mb-4 text-primary hover:text-primary-dark"
            onClick={() => router.push("/")}
          >
            ← Back
          </button>
          <h2 className="text-4xl font-extrabold text-primary mb-6 md:text-center text-left">
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
            <div className="text-right">
              <Link
                href="forgotpassword"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <FormButton label="Continue" loading={signinLoading} />
            <p className="text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link href="signup" className="text-accent hover:underline">
                Register
              </Link>
            </p>
          </form>
          <div className="mt-6">
            <GoogleAuthentication />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
