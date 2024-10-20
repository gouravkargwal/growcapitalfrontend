import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllPlans, updateUserPlanApi } from "./plan.service";
import { handleAxiosError } from "@/lib/apiError";
import { fetchUserPlan } from "../User/userSlice";
import { openSnackbar } from "../Snackbar/snackbarSlice";

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
}

const initialState: PlanState = {
  data: [],
  loading: false,
  updateUserPlanLoading: false,
};

export type PlanPayload = {
  userId: string;
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

export const upgradeUserPlan = createAsyncThunk(
  "plan/upgradeUserPlan",
  async (payload: PlanPayload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await updateUserPlanApi(payload);
      dispatch(
        openSnackbar({
          message: "Plan upgraded successfully",
          severity: "success",
        })
      );
      dispatch(fetchUserPlan());
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {},
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
      .addCase(upgradeUserPlan.pending, (state) => {
        state.updateUserPlanLoading = true;
      })
      .addCase(upgradeUserPlan.fulfilled, (state) => {
        state.updateUserPlanLoading = false;
      })
      .addCase(upgradeUserPlan.rejected, (state) => {
        state.updateUserPlanLoading = false;
      });
  },
});

export default planSlice.reducer;
