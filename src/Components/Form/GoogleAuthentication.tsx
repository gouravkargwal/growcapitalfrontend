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
      {/* Divider with 'OR' */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-4 text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Sign-In Button */}
      <div className="my-4 text-center">
        <button
          onClick={handleGoogleSignIn}
          className={`bg-red-500 text-white w-full py-3 rounded-btn-lg shadow-lg hover:bg-red-600 transition-all duration-300 ease-in-out ${
            googleAuthLoading && "cursor-not-allowed"
          }`}
          disabled={googleAuthLoading}
        >
          {googleAuthLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
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
              <span>Signing in with Google...</span>
            </div>
          ) : (
            "Sign in with Google"
          )}
        </button>
      </div>
    </div>
  );
};

export default GoogleAuthentication;
