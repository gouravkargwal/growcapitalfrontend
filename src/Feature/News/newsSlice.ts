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

type News = {
  imageSrc: string; // URL or path to the image
  source: string; // News source name
  timeAgo: string; // How long ago the news was posted
  title: string; // Title of the news article
  description: string; // Brief description or summary of the article
  category: string; // News category (e.g., Sports, Tech, etc.)
  readTime: string; // Estimated reading time for the article
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

export const mockNewsData = [
  {
    imageSrc: "https://via.placeholder.com/400x250.png?text=News+Image+1",
    source: "The Daily Times",
    timeAgo: "2 hours ago",
    title: "Breaking News: Major Event Unfolds",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula, urna eu condimentum sollicitudin, velit turpis vehicula elit.",
    category: "Breaking News",
    readTime: "5 min read",
    id: "1",
  },
  {
    imageSrc: "https://via.placeholder.com/400x250.png?text=News+Image+2",
    source: "Global Reports",
    timeAgo: "4 hours ago",
    title: "New Technology Revolutionizes Industry",
    description:
      "Praesent nec nibh id turpis convallis gravida in a nunc. Nam volutpat malesuada felis in venenatis.",
    category: "Technology",
    readTime: "4 min read",
    id: "2",
  },
  {
    imageSrc: "https://via.placeholder.com/400x250.png?text=News+Image+3",
    source: "Finance Today",
    timeAgo: "1 day ago",
    title: "Stock Markets Hit Record Highs",
    description:
      "Vivamus sit amet nunc vehicula, accumsan libero in, cursus orci. Integer eu elit magna.",
    category: "Finance",
    readTime: "3 min read",
    id: "3",
  },
  {
    imageSrc: "https://via.placeholder.com/400x250.png?text=News+Image+4",
    source: "Health Matters",
    timeAgo: "2 days ago",
    title: "Tips for a Healthier Lifestyle",
    description:
      "Phasellus vel turpis eget nunc pharetra tincidunt vitae a nunc. Ut tincidunt arcu non turpis tempus euismod.",
    category: "Health",
    readTime: "6 min read",
    id: "4",
  },
  {
    imageSrc: "https://via.placeholder.com/400x250.png?text=News+Image+5",
    source: "Sports Weekly",
    timeAgo: "3 days ago",
    title: "Local Team Wins Championship",
    description:
      "Ut rhoncus urna non justo malesuada, sit amet scelerisque mi aliquet. Etiam volutpat, metus at varius faucibus.",
    category: "Sports",
    readTime: "2 min read",
    id: "5",
  },
];

const initialState: NewsState = {
  data: [],
  loading: false,
  updateLoading: false,
  timelineData: mockNewsData,
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
