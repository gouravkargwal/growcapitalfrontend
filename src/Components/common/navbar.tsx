import React, { useState } from "react";
import { auth, useAuth } from "@/lib/firebase"; // Assuming this hook provides auth state and a logout function
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useAuth(); // Assuming `useAuth` returns user and logout function
  const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu toggle

  const handleLogin = () => {
    console.log("Hello");

    router.push("/signin");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Call logout function from useAuth hook
      router.push("/signin"); // Redirect to signin after logout
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle mobile menu state
  };

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center py-6 px-10">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Logo
        </div>

        <div className="lg:hidden block">
          <button onClick={toggleMenu} className="text-xl focus:outline-none">
            ☰
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8 text-lg">
          <a href="#" className="text-gray-600">
            Our Solution
          </a>
          <a href="#" className="text-gray-600">
            Reviews
          </a>
          <a href="#" className="text-gray-600">
            About Us
          </a>
          <a href="#" className="text-gray-600">
            Blog
          </a>
        </nav>

        {/* Conditional Buttons */}
        <div className="hidden lg:flex space-x-4">
          {!user ? (
            <>
              <button
                className="text-blue-500 border border-blue-500 px-6 py-2 rounded-lg text-lg"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg"
                onClick={handleDashboard}
              >
                Go to Dashboard
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu with Animation */}
      <nav
        className={`lg:hidden bg-white px-10 py-6 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-full"
        } overflow-hidden`}
      >
        <ul className="space-y-4 text-lg transition-opacity duration-300 ease-in-out">
          <li>
            <a href="#" className="block text-gray-600">
              Our Solution
            </a>
          </li>
          <li>
            <a href="#" className="block text-gray-600">
              Reviews
            </a>
          </li>
          <li>
            <a href="#" className="block text-gray-600">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="block text-gray-600">
              Blog
            </a>
          </li>
          <li>
            {!user ? (
              <>
                <button
                  className="w-full text-blue-500 border border-blue-500 px-4 py-2 rounded-lg text-lg"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-lg mt-4"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg text-lg"
                  onClick={handleDashboard}
                >
                  Go to Dashboard
                </button>
                <button
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-lg text-lg mt-4"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
