import React from "react";

interface ButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

const FormButton: React.FC<ButtonProps> = ({
  label,
  loading = false,
  disabled = false,
  onClick,
  type = "submit",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`w-full py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center ${
      loading || disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600 text-white"
    }`}
  >
    {loading ? (
      <div className="flex items-center space-x-2">
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
        <span>Loading...</span>
      </div>
    ) : (
      <span>{label}</span>
    )}
  </button>
);

export default FormButton;
