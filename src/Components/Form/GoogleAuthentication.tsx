import React from "react";
import { auth } from "@/lib/firebase";
import { googleAuth } from "@/Feature/Auth/authSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { FcGoogle } from "react-icons/fc";
import { googleSigninClicked, signInFail, signInSucces } from "@/events/auth/signin-events";
import { logEvent } from "@/events/analytics";

const GoogleAuthentication = () => {
  const dispatch = useAppDispatch();
  const googleSIgnIn = googleSigninClicked();
  const success = signInSucces();
  const fail = signInFail();
  const router = useRouter();
  const { googleAuthLoading } = useSelector((state: RootState) => state.auth);

  const handleGoogleSignIn = async () => {
    const result = await dispatch(googleAuth());
    if (googleAuth.fulfilled.match(result)) {
      router.replace("/dashboard");
      logEvent(success);
    } else {
      await auth.signOut();
      logEvent(fail);
    }
    logEvent(googleSIgnIn);
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
          className={`p-3 rounded-full border-2 hover:border-gray-400 transition-all duration-500 ease-in-out ${googleAuthLoading && "cursor-not-allowed"
            }`}
          disabled={googleAuthLoading}
        >
          {googleAuthLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <FcGoogle size={24} />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default GoogleAuthentication;
