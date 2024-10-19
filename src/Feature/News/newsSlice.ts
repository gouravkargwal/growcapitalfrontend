import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { handleAxiosError } from "@/lib/apiError";
import { getAllNewsType, updateUserNewsTypesApi } from "./news.service";
import { openSnackbar } from "../Snackbar/snackbarSlice";
import { NewsTypeDto, UpdateNewsTypeDto } from "./news.dto";

const dummyNews = [
  {
    imageSrc: "https://via.placeholder.com/150",
    source: "Netflix",
    timeAgo: "12 minutes ago",
    title: "Where To Watch 'John Wick: Chapter 4'",
    description: "Lionsgate's release details for John Wick: Chapter 4",
    category: "Movies",
    readTime: "4 min read",
  },
  {
    imageSrc: "https://via.placeholder.com/150",
    source: "HBO",
    timeAgo: "1 hour ago",
    title: "Game of Thrones Spin-Off: What We Know So Far",
    description:
      "HBO is planning to release multiple spin-offs of the hit show.",
    category: "Entertainment",
    readTime: "5 min read",
  },
  // Add more dummy data if needed
];

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (page: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const hasMore = page < 5; // Let's assume we have 5 pages of dummy data
        resolve({ dummyNews, hasMore });
      }, 1000); // Simulate network delay
    });
  }
);

interface TimelineData {
  news: Array<any>;
  loading: boolean;
  hasMore: boolean;
  currentPage: number;
}

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

export type NewsState = {
  data: NewsTypeDto[];
  loading: boolean;
  updateLoading: boolean;
  timelineData: TimelineData[];
  timelineDataLoading: boolean;
  hasMore: boolean;
  currentPage: number;
};

const initialState: NewsState = {
  data: [],
  loading: false,
  updateLoading: false,
  timelineData: [],
  timelineDataLoading: false,
  hasMore: true,
  currentPage: 1,
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
