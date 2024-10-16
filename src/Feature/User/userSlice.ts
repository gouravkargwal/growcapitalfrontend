import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUserPlan } from "./user.service";
import { handleAxiosError } from "@/lib/apiError";

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
  initialState: {
    data: [],
    loading: false,
  },
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
