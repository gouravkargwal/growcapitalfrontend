import React from "react";
import { auth } from "@/lib/firebase";
import { googleAuth } from "@/Feature/Auth/authSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";

const GoogleAuthentication = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { googleAuthLoading } = useSelector((state: RootState) => state.auth);
  const handleGoogleSignIn = async () => {
    const result = await dispatch(googleAuth());
    if (googleAuth.fulfilled.match(result)) {
      router.push("/dashboard");
    } else {
      await auth.signOut();
    }
  };
  return (
    <div>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-4 text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="my-4 text-center">
        <button
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          disabled={googleAuthLoading}
        >
          {googleAuthLoading
            ? "Signing in with Google..."
            : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
};

export default GoogleAuthentication;
