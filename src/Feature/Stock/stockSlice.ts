import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getStockSuggestion,
  getUserTrackedStocks,
  updateStockSubscriptionApi,
} from "./stock.service";
import { handleAxiosError } from "@/lib/apiError";

export const fetchUserStocks = createAsyncThunk(
  "stock/fetchUserStocks",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getUserTrackedStocks();
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

export const fetchStockSuggestion = createAsyncThunk(
  "stock/fetchStockSuggestion",
  async (body: { query: string }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getStockSuggestion(body);
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

export const updateStockSubscription = createAsyncThunk(
  "stock/updateStockSubscription",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await updateStockSubscriptionApi(body);
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    data: [],
    loading: false,
    stockSuggestion: [],
    stockSuggestionLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(fetchUserStocks.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchStockSuggestion.pending, (state) => {
        state.stockSuggestionLoading = true;
      })
      .addCase(fetchStockSuggestion.fulfilled, (state, action) => {
        state.stockSuggestionLoading = false;
        state.stockSuggestion = action.payload || [];
      })
      .addCase(fetchStockSuggestion.rejected, (state, action) => {
        state.stockSuggestionLoading = false;
      });
  },
});

export default stockSlice.reducer;
