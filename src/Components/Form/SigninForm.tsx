import * as yup from "yup";
import { useForm } from "react-hook-form";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import InputField from "../UI/InputField";
import FormButton from "../UI/FormButton";
import { signInUser } from "@/Feature/Auth/authSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import GoogleAuthentication from "./GoogleAuthentication";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import Image from "next/image";

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
    const result = await dispatch(signInUser(data));
    if (signInUser.fulfilled.match(result)) {
      const user = result.payload.user;
      if (user?.emailVerified) {
        router.push("/dashboard");
      } else {
        router.push("/emailVerification");
      }
    } else {
      await auth.signOut();
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Image Section (hidden on mobile, shown on md and larger) */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-r from-primary to-blue-600 text-white items-center justify-center">
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
              Empower your financial tasks today with Findash.
            </p>
            <p className="text-gray-200 mb-6">
              The one-stop platform for all financial management of small and
              medium-sized businesses.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full h-screen md:w-1/2 flex justify-center items-center bg-white">
        <div className="max-w-md w-full p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-4xl font-extrabold text-primary mb-6 text-center">
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
            {/* Forgot Password Link */}
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
