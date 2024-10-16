import { useAuth } from "@/lib/firebase"; // Assuming this returns user and loading state
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuthGuard = () => {
  const router = useRouter();
  const { user, loading } = useAuth(); // Replace with your actual hook to get auth state

  useEffect(() => {
    if (!loading) {
      const requestedPath = window.location.pathname; // The page user is trying to access

      if (!user) {
        // User is not logged in, redirect to sign-in with redirect parameter
        if (requestedPath !== "/signin") {
          router.push(`/signin?redirect=${encodeURIComponent(requestedPath)}`);
        }
      } else {
        // User is logged in and trying to access sign-in or signup page, redirect them
        if (requestedPath === "/signin" || requestedPath === "/signup") {
          router.push("/dashboard"); // Redirect authenticated user to dashboard
        }
      }
    }
  }, [user, loading, router]);

  return { user, loading };
};

export default useAuthGuard;
