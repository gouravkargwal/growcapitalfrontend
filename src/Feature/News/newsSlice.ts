import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { handleAxiosError } from "@/lib/apiError";
import { getAllNewsType, updateUserNewsTypesApi } from "./news.service";
import { openSnackbar } from "../Snackbar/snackbarSlice";
import { NewsTypeDto, UpdateNewsTypeDto } from "./news.dto";

export const fetchUserNewsTypes = createAsyncThunk(
  "news/fetchUserNewsTypes",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getAllNewsType();
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

export const updateUserNewsTypes = createAsyncThunk(
  "news/updateUserNewsTypes",
  async (body: UpdateNewsTypeDto, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await updateUserNewsTypesApi(body);
      dispatch(
        openSnackbar({
          message: `Notification for news type is ${
            body?.isSubscribed ? "enabled" : "disabled"
          }.`,
          severity: "success",
        })
      );
      dispatch(fetchUserNewsTypes());
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

type NewsState = {
  data: NewsTypeDto[];
  loading: boolean;
  updateLoading: boolean;
};

const initialState: NewsState = {
  data: [],
  loading: false,
  updateLoading: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNewsTypes.pending, (state) => {
        state.data = [];
        state.loading = true;
      })
      .addCase(fetchUserNewsTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || [];
      })
      .addCase(fetchUserNewsTypes.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUserNewsTypes.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateUserNewsTypes.fulfilled, (state, action) => {
        state.updateLoading = false;
      })
      .addCase(updateUserNewsTypes.rejected, (state, action) => {
        state.updateLoading = false;
      });
  },
});

export default newsSlice.reducer;
