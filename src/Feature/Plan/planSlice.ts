import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  applyCouponApi,
  checkPaymentStatusApi,
  createPaymentOrderIdApi,
  getAllPlans,
  getPlansHistory,
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

export interface PlanHistory {
  userPlanId: number;
  plan: Plan;
  startDate: string;
  endDate: string;
}

export interface PlanState {
  data: Plan[];
  loading: boolean;
  updateUserPlanLoading: boolean;
  overlayStatus: boolean;
  planHistoryLoading: boolean;
  planHistory: PlanHistory[];
  couponLoading: boolean;
  couponFinalPrice: number | null;
  couponDiscount: number | null;
}

const initialState: PlanState = {
  data: [],
  loading: false,
  updateUserPlanLoading: false,
  overlayStatus: false,
  planHistoryLoading: false,
  planHistory: [],
  couponLoading: false,
  couponFinalPrice: null,
  couponDiscount: null,
};

export type PlanPayload = {
  planId: number;
  durationInMonths: number;
  couponCode?: string;
};

export type CouponPayload = {
  couponCode: string;
  planPrice: number;
  planId: number;
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

export const fetchPlansHistory = createAsyncThunk(
  "plan/fetchPlansHistory",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getPlansHistory();
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
export const applyCoupon = createAsyncThunk(
  "coupons/apply",
  async (payload: CouponPayload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await applyCouponApi(payload);
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
      const response = await checkPaymentStatusApi(paymentId, signal);

      if (response && response.status === 200) {
        const { status } = response.data;

        if (status === "captured") {
          dispatch(
            openSnackbar({ message: "Payment Success", severity: "success" })
          );
          dispatch(fetchUserPlan());
          dispatch(fetchPlansHistory());
          return true; // Payment successful, exit polling
        } else if (status === "failed") {
          dispatch(
            openSnackbar({ message: "Payment Failed", severity: "error" })
          );
          return rejectWithValue("Payment failed");
        }
      } else {
        throw new Error("Payment status check failed");
      }
      attempt++;
      if (attempt < maxAttempts) {
        // Wait for the next attempt
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }
    dispatch(
      openSnackbar({
        message:
          "We were unable to confirm your payment status after several attempts. If your payment has been deducted from your account, please contact support for assistance.",
        severity: "warning",
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
    resetCoupon: (state) => {
      state.couponFinalPrice = null;
      state.couponDiscount = null;
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
      })
      .addCase(fetchPlansHistory.pending, (state) => {
        state.planHistoryLoading = true;
      })
      .addCase(fetchPlansHistory.fulfilled, (state, action) => {
        state.planHistoryLoading = false;
        state.planHistory = action.payload || []; // Save the user data
      })
      .addCase(fetchPlansHistory.rejected, (state) => {
        state.planHistoryLoading = false;
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
      .addCase(applyCoupon.pending, (state) => {
        state.couponLoading = true;
        state.couponFinalPrice = null;
        state.couponDiscount = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.couponLoading = false;
        state.couponFinalPrice = action.payload.finalPrice;
        state.couponDiscount = action.payload.discount;
      })
      .addCase(applyCoupon.rejected, (state) => {
        state.couponLoading = false;
        state.couponFinalPrice = null;
        state.couponDiscount = null;
      })

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

export const { paymentOverlay, resetCoupon } = planSlice.actions;

export default planSlice.reducer;
