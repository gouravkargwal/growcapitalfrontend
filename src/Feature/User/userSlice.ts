import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUserAccountOverview, getUserPlan } from "./user.service";
import { handleAxiosError } from "@/lib/apiError";
import { Plan } from "../Plan/planSlice";

// Define UserPlan type
export interface UserPlan {
  userId: string;
  plan: Plan; // User's current plan is of type Plan
  endDate: string | null; // End date is a string or could be null
  startDate: string | null;
}

export type UserAccountOverview = {
  title: string;
  value: string;
};

// Define UserState to hold UserPlan or null
export interface UserState {
  data: UserPlan | null; // User plan information (or null if not available)
  loading: boolean; // Loading state for fetching the plan
  accountOverview: UserAccountOverview[] | null;
  accountOverviewLoading: boolean;
}

const initialState: UserState = {
  data: null, // Initialize as null since there's no plan by default
  loading: false,
  accountOverview: null,
  accountOverviewLoading: false,
};

export const fetchUserPlan = createAsyncThunk(
  "user/fetchUserPlan",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getUserPlan();
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

export const fetchUserAccountOverview = createAsyncThunk(
  "user/fetchUserAccountOverview",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getUserAccountOverview();
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || []; // Save the user data
      })
      .addCase(fetchUserPlan.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchUserAccountOverview.pending, (state) => {
        state.accountOverviewLoading = true;
      })
      .addCase(fetchUserAccountOverview.fulfilled, (state, action) => {
        state.accountOverviewLoading = false;
        state.accountOverview = action.payload || []; // Save the user data
      })
      .addCase(fetchUserAccountOverview.rejected, (state, action) => {
        state.accountOverviewLoading = false;
      });
  },
});

export default userSlice.reducer;
