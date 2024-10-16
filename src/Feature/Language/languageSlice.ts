import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAllLanguages,
  getUserAndAllLanguages,
  updateUserLanguageApi,
} from "./language.service";
import { handleAxiosError } from "@/lib/apiError";

export interface Language {
  languageId: number;
  languageName: string;
  isSelected: boolean;
}

export interface LanguageState {
  userLanguages: Language[]; // This ensures that userLanguages is an array of Language objects
  userLanguagesLoading: boolean;
  updateUserLanguageLoading: boolean;
}

const initialState: LanguageState = {
  userLanguages: [], // Initialize as an empty array of Language
  userLanguagesLoading: false,
  updateUserLanguageLoading: false,
};

export const fetchLanguages = createAsyncThunk(
  "language/fetchLanguages",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getAllLanguages();
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

export const fetchUserLanguages = createAsyncThunk(
  "language/fetchUserLanguages",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await getUserAndAllLanguages();

      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

export const updateUserLanguage = createAsyncThunk<
  void,
  { languageId: number }
>(
  "language/updateUserlanguage",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await updateUserLanguageApi(body);
      dispatch(fetchUserLanguages());
      return data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

const languageSlice = createSlice({
  name: "language",
  initialState: {
    data: [],
    loading: false,
    userLanguages: [],
    userLanguagesLoading: false,
    updateUserLanguageLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchUserLanguages.pending, (state) => {
        state.userLanguagesLoading = true;
      })
      .addCase(fetchUserLanguages.fulfilled, (state, action) => {
        state.userLanguagesLoading = false;
        state.userLanguages = action.payload;
      })
      .addCase(fetchUserLanguages.rejected, (state, action) => {
        state.userLanguagesLoading = false;
      })
      .addCase(updateUserLanguage.pending, (state) => {
        state.updateUserLanguageLoading = true;
      })
      .addCase(updateUserLanguage.fulfilled, (state, action) => {
        state.updateUserLanguageLoading = false;
      })
      .addCase(updateUserLanguage.rejected, (state, action) => {
        state.updateUserLanguageLoading = false;
      });
  },
});

export default languageSlice.reducer;
