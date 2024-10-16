import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRewardData } from "./reward.service";
import { handleAxiosError } from "@/lib/apiError";

export const fetchRewards = createAsyncThunk(
  "reward/fetchRewards",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getRewardData();
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

const rewardSlice = createSlice({
  name: "reward",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(fetchRewards.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default rewardSlice.reducer;
