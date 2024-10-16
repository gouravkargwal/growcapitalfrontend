import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import axios from "axios";

export const handleAxiosError = (
  error: any,
  rejectWithValue: any,
  dispatch: any
) => {
  let errorMessage = "Internal Server Error";
  console.log(error);
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data}`);

      // Handle specific 401 Unauthorized error
      if (error.response.status === 401) {
        // Show snackbar with unauthorized error message
        dispatch(
          openSnackbar({
            message: error?.response?.data?.message,
            severity: "error",
          })
        );
        return rejectWithValue(errorMessage);
      }

      // General error message handling for other status codes
      errorMessage =
        error.response.data.message || "An error occurred during the operation";
      dispatch(openSnackbar({ message: errorMessage, severity: "error" }));
      return rejectWithValue(errorMessage);
    } else if (error.request) {
      console.error("No response received:", error.request);
      errorMessage = "No response from the server. Please try again.";
      dispatch(openSnackbar({ message: errorMessage, severity: "error" }));
      return rejectWithValue(errorMessage);
    } else {
      console.error("Error in setting up request:", error.message);
      errorMessage =
        error.message || "An error occurred while setting up the request.";
      dispatch(openSnackbar({ message: errorMessage, severity: "error" }));
      return rejectWithValue(errorMessage);
    }
  }

  // Catch unknown errors
  dispatch(
    openSnackbar({ message: "Unknown error occurred", severity: "error" })
  );
  return rejectWithValue("Unknown error occurred");
};
