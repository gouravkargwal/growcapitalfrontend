import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  checkPaymentStatusApi,
  createPaymentOrderIdApi,
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

export const createPaymentOrderId = createAsyncThunk(
  "plan/createPaymentOrderId",
  async (payload: PlanPayload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await createPaymentOrderIdApi(payload);
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
    const maxAttempts = 12;
    const interval = 10000;
    let attempt = 0;

    while (attempt < maxAttempts) {
      if (signal.aborted) {
        return rejectWithValue("Polling aborted");
      }

      try {
        const response = await checkPaymentStatusApi(paymentId, signal);

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
            return rejectWithValue("Payment failed");
          }
        }
      } catch (error) {
        const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
        if (axiosError) return axiosError;
        return rejectWithValue(error);
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
    return rejectWithValue("Max attempts reached");
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
      .addCase(createPaymentOrderId.pending, (state) => {
        state.updateUserPlanLoading = true;
      })
      .addCase(createPaymentOrderId.fulfilled, (state) => {
        state.updateUserPlanLoading = false;
      })
      .addCase(createPaymentOrderId.rejected, (state) => {
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
