import { useRouter } from "next/navigation";
import React from "react";

interface CardProps {
  icon: React.ReactNode;
  count: string;
  label: string;
  color: string;
  borderColor: string;
  route: string;
}

const Card: React.FC<CardProps> = ({
  icon,
  count,
  label,
  color,
  borderColor,
  route,
}) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col justify-between rounded-lg w-full sm:w-64 h-auto sm:h-36 border transition-shadow duration-300 ease-in-out hover:shadow-lg"
      style={{ backgroundColor: color, borderColor: borderColor }}
    >
      <div className="flex flex-row justify-start p-4">
        <div className="bg-white p-3 rounded-lg flex justify-center items-center mr-4 mb-2 sm:mb-0 w-fit">
          <div className="text-2xl md:text-4xl text-center">{icon}</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-2xl font-bold text-black mb-1">{count}</div>
          <div className="text-gray-600 text-sm md:text-base">{label}</div>
        </div>
      </div>
      <hr
        className="mt-1 border-t"
        style={{ borderColor: borderColor, marginBottom: "0" }}
      />
      <div
        className="flex justify-between items-center px-4 text-sm md:text-base my-2"
        style={{ color: borderColor }}
      >
        <span
          className="font-semibold cursor-pointer hover:underline duration-300 ease-in-out transition-all"
          onClick={() => {
            router.push(route);
          }}
        >
          See Details
        </span>
        <span className="text-xl">→</span>
      </div>
    </div>
  );
};

export default Card;
