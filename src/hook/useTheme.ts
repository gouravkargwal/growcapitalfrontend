import { ThemeContext } from "@/Context/ThemeContext";
import { useContext } from "react";

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("usetheme should be used inside theme provider");
  }
  return context;
};

export default useTheme;
