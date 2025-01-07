import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { handleAxiosError } from "@/lib/apiError";
import {
  getAllNewsType,
  getNewsById,
  getSentUserNews,
  updateUserNewsTypesApi,
} from "./news.service";
import { openSnackbar } from "../Snackbar/snackbarSlice";
import { NewsTypeDto, UpdateNewsTypeDto } from "./news.dto";

export type News = {
  companyName: string;
  heading: string;
  industry: string;
  isinNumber: string;
  newsId: string;
  newsTime: string;
  scripCode: string;
  shortSummary: string;
  longSummary: string;
  stockIndex: number;
  tickerSymbol: string;
  urlPath: string,
};

export type NewsState = {
  data: NewsTypeDto[];
  loading: boolean;
  updateLoading: boolean;
  timelineData: News[];
  timelineDataLoading: boolean;
  hasMore: boolean;
  currentPage: number;
  newsDetailLoading: boolean;
  newsDetail: object | null | undefined;
};

export const fetchNewsById = createAsyncThunk(
  "news/fetchNewsById",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getNewsById(id);
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ page, limit = 10 }: { page: number; limit?: number }) => {
    const response = await getSentUserNews(page, limit);
    return {
      data: response.data.data,
      hasMore: response.data.hasMore,
    };
  }
);

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
          message: `Notification for news type is ${body?.isSubscribed ? "enabled" : "disabled"
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

const initialState: NewsState = {
  data: [],
  loading: false,
  updateLoading: false,
  timelineData: [],
  timelineDataLoading: false,
  hasMore: true,
  currentPage: 1,
  newsDetailLoading: false,
  newsDetail: null,
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
      .addCase(fetchUserNewsTypes.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUserNewsTypes.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateUserNewsTypes.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateUserNewsTypes.rejected, (state) => {
        state.updateLoading = false;
      })

      // Handle fetchNews for infinite scroll
      .addCase(fetchNews.pending, (state) => {
        state.timelineDataLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.timelineDataLoading = false;
        state.timelineData = [...state.timelineData, ...action.payload.data];
        state.hasMore = action.payload.hasMore;
        state.currentPage += 1; // Increment current page
      })
      .addCase(fetchNews.rejected, (state) => {
        state.timelineDataLoading = false;
      })

      .addCase(fetchNewsById.pending, (state) => {
        state.newsDetailLoading = true;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.newsDetailLoading = false;
        state.newsDetail = action.payload.data;
      })
      .addCase(fetchNewsById.rejected, (state) => {
        state.newsDetailLoading = false;
      });
  },
});

export default newsSlice.reducer;
