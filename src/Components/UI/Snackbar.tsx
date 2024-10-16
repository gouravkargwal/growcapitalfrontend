import React, { useEffect } from "react";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { closeSnackbar } from "@/Feature/Snackbar/snackbarSlice";

const Snackbar = () => {
  const dispatch = useAppDispatch();
  const { isOpen, message, severity } = useSelector(
    (state: RootState) => state.snackbar
  );

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        dispatch(closeSnackbar());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const severityStyles = {
    error: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-600 text-black",
  };

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg ${severityStyles[severity]} transition-opacity duration-300`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
