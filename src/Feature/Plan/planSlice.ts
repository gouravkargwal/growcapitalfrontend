import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  checkPaymentStatusApi,
  createPaymentLinkApi,
  getAllPlans,
} from "./plan.service";
import { handleAxiosError } from "@/lib/apiError";
import { openSnackbar } from "../Snackbar/snackbarSlice";
import { fetchUserPlan } from "../User/userSlice";

export interface Plan {
  planId: number;
  planName: string;
  planPrice: number;
  stocksLimit: number;
  finalPrice: number;
}

export interface PlanState {
  data: Plan[];
  loading: boolean;
  updateUserPlanLoading: boolean;
  overlayStatus: boolean;
}

const initialState: PlanState = {
  data: [],
  loading: false,
  updateUserPlanLoading: false,
  overlayStatus: false,
};

export type PlanPayload = {
  planId: number;
  activationType: "IMMEDIATE" | "AFTER_EXPIRY";
  durationInMonths: number;
};

export const fetchAllPlans = createAsyncThunk(
  "plan/fetchAllPlans",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getAllPlans();
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

export const createPaymentLink = createAsyncThunk(
  "plan/createPaymentLink",
  async (payload: PlanPayload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await createPaymentLinkApi(payload);
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

export const pollPaymentStatus = createAsyncThunk(
  "plan/pollStatus",
  async (paymentId: string, { dispatch, rejectWithValue, signal }) => {
    const maxAttempts = 12; // 2 minutes total (12 attempts with 10 sec interval)
    const interval = 10000; // 10 seconds
    let attempt = 0;

    const abortPromise = new Promise((_, reject) => {
      signal.addEventListener("abort", () => {
        reject(new Error("Polling aborted"));
      });
    });

    while (attempt < maxAttempts) {
      if (signal.aborted) {
        return rejectWithValue("Polling aborted");
      }

      try {
        const response = await Promise.race([
          checkPaymentStatusApi(paymentId, signal),
          abortPromise,
        ]);

        if (response && response.status === 200) {
          const { status } = response.data;
          if (status === "paid") {
            dispatch(
              openSnackbar({ message: "Payment Success", severity: "success" })
            );
            dispatch(fetchUserPlan());
            return true; // Payment successful, exit polling
          } else if (status === "cancelled") {
            dispatch(
              openSnackbar({ message: "Payment Failed", severity: "error" })
            );
            return rejectWithValue(false); // Payment failed, exit polling
          }
        }
      } catch (error) {
        if (error.message === "Polling aborted") {
          dispatch(
            openSnackbar({
              message: "Payment polling has been aborted.",
              severity: "warning",
            })
          );
          return rejectWithValue("Polling aborted");
        }

        dispatch(
          openSnackbar({
            message: "An error occurred while checking payment status.",
            severity: "error",
          })
        );
        return rejectWithValue(error); // Exit polling on error
      }

      attempt++;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    dispatch(
      openSnackbar({
        message: "Payment status could not be confirmed.",
        severity: "error",
      })
    );
    return rejectWithValue(false); // Max attempts reached, exit polling
  }
);

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    paymentOverlay: (state, action) => {
      state.overlayStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || []; // Save the user data
      })
      .addCase(fetchAllPlans.rejected, (state) => {
        state.loading = false;
      });

    // Upgrade user plan
    builder
      .addCase(createPaymentLink.pending, (state) => {
        state.updateUserPlanLoading = true;
      })
      .addCase(createPaymentLink.fulfilled, (state) => {
        state.updateUserPlanLoading = false;
      })
      .addCase(createPaymentLink.rejected, (state) => {
        state.updateUserPlanLoading = false;
      });

    builder
      .addCase(pollPaymentStatus.pending, (state) => {
        state.overlayStatus = true;
      })
      .addCase(pollPaymentStatus.fulfilled, (state) => {
        state.overlayStatus = false;
      })
      .addCase(pollPaymentStatus.rejected, (state) => {
        state.overlayStatus = false;
      });
  },
});

export const { paymentOverlay } = planSlice.actions; // Correctly export the action

export default planSlice.reducer;
