import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRewardData } from "./reward.service";
import { handleAxiosError } from "@/lib/apiError";

export interface Reward {
  rewardType: string;
  rewardAmount: number;
  referralCount: number;
  referralCountRequired: number;
  isEligible: boolean;
  claimed: boolean;
  configId: string;
}

export interface RewardState {
  data: Reward[]; // Array of rewards
  loading: boolean;
}

const initialState: RewardState = {
  data: [], // Initialize as an empty array of Reward objects
  loading: false,
};

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
  initialState,
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
