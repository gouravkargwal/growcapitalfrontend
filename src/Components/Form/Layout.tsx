import React, { ReactNode } from "react";
import Image from "next/image";
import bg from "../../../assets/home.png";
import logo from "../../../assets/logo-3.png";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex w-full md:w-[50%] bg-secondary text-white flex-col">
        <div className="w-full pt-14 pl-16 bg-black bg-opacity-10">
          <Image
            src={bg}
            alt="Dashboard Overview"
            layout="responsive"
            className="w-full h-1/2 mb-0 object-fill rounded-tl-2xl"
          />
        </div>
        <div className="w-full bg-black bg-opacity-30 p-8 backdrop-blur-md text-start flex flex-col justify-between h-full">
          <Image
            src={logo}
            alt="Informe"
            height={60}
            className="mb-4"
          />
          <div className="mt-auto">
            <p className="text-5xl text-gray-100 font-bold mb-5">
              Stay Ahead with Real-Time Stock News
            </p>
            <p className="text-gray-200">
              🌐 Stay ahead with real-time updates! 100-word summaries 🗣️,
              add/remove stocks, stay informed! 📲
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-screen md:w-1/2 flex justify-center items-center bg-gray-50">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
