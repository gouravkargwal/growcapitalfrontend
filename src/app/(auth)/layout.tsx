"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/firebase";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth(); // Use your hook to get auth state
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return; // Wait until loading is complete

    // Redirect to dashboard only if user is authenticated, verified, and on the public landing page
    if (user && pathname === "/") {
      router.replace("/dashboard");
    }
  }, [user, loading, router, pathname]);

  return <main>{children}</main>;
}
