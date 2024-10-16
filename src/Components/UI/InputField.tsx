const InputField = ({
  label,
  register,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  register: any;
  type?: string;
  placeholder: string;
  error?: string | undefined;
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        }`}
      />
      {/* Reserve space for the error message */}
      <p className="text-red-500 text-xs italic h-4">{error ?? ""}</p>
    </div>
  );
};

export default InputField;
