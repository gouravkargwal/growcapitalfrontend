import React from "react";

interface InputFieldProps {
  label: string;
  register: any;
  type?: string;
  placeholder: string;
  error?: string | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  register,
  type = "text",
  placeholder,
  error,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-textPrimary text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className={`shadow-sm appearance-none border rounded-btn-lg w-full py-3 px-4 text-textPrimary leading-tight focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-primary"
        }`}
      />
      {/* Error Message */}
      <p className="text-red-500 text-xs italic mt-2">{error ?? ""}</p>
    </div>
  );
};

export default InputField;
