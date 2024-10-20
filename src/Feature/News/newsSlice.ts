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
];
export const fetchNews = createAsyncThunk<
  { news: News[]; hasMore: boolean }, // Specify the return type here
  number // Specify the argument type (page number)
>("news/fetchNews", async (page: number) => {
  return new Promise<{ news: News[]; hasMore: boolean }>((resolve) => {
    setTimeout(() => {
      const hasMore = page < 5; // Let's assume we have 5 pages of dummy data
      resolve({ news: dummyNews, hasMore }); // Correct the return structure
    }, 1000); // Simulate network delay
  });
});

type News = {
  imageSrc: string; // URL or path to the image
  source: string; // News source name
  timeAgo: string; // How long ago the news was posted
  title: string; // Title of the news article
  description: string; // Brief description or summary of the article
  category: string; // News category (e.g., Sports, Tech, etc.)
  readTime: string; // Estimated reading time for the article
};

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
  timelineData: News[];
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
      });
  },
});

export default newsSlice.reducer;
