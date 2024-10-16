import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUserPlan } from "./user.service";
import { handleAxiosError } from "@/lib/apiError";
import { Plan } from "../Plan/planSlice";

// Define UserPlan type
export interface UserPlan {
  userId: string;
  plan: Plan; // User's current plan is of type Plan
  endDate: string | null; // End date is a string or could be null
  startDate: string | null;
}

// Define UserState to hold UserPlan or null
export interface UserState {
  data: UserPlan | null; // User plan information (or null if not available)
  loading: boolean; // Loading state for fetching the plan
}

const initialState: UserState = {
  data: null, // Initialize as null since there's no plan by default
  loading: false,
};

export const fetchUserPlan = createAsyncThunk(
  "reward/fetchUserPlan",
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
      });
  },
});

export default userSlice.reducer;
