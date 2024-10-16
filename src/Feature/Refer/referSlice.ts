import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getReferData } from "./refer.service";
import { handleAxiosError } from "@/lib/apiError";

export const fetchReferrals = createAsyncThunk(
  "refer/fetchReferrals",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getReferData();
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

const referSlice = createSlice({
  name: "refer",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferrals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReferrals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || []; // Save the user data
      })
      .addCase(fetchReferrals.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default referSlice.reducer;
