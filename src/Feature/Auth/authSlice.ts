import { GoogleAuthData, SignupData } from "./auth.dto";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  googleAuthService,
  signupService,
  verifyEmailService,
  verifyTokenService,
} from "./auth.service";

import { handleAxiosError } from "@/lib/apiError";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData: SignupData, { rejectWithValue, dispatch }) => {
    try {
      const response = await signupService(userData);
      return response.data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      // Return the error for handling in the component
      return rejectWithValue(error);
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const idToken = await user.getIdToken();
      const { data } = await googleAuthService({ token: idToken });
      return data;
    } catch (error) {
      await auth.signOut();
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (userId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await verifyEmailService(userId);
      return response.data;
    } catch (error) {
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (
    data: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      const token = await userCredential.user.getIdToken();
      await verifyTokenService(token);
      return {
        user: userCredential.user,
        token: token,
      };
    } catch (error) {
      await auth.signOut();
      const axiosError = handleAxiosError(error, rejectWithValue, dispatch);
      if (axiosError) return axiosError;
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    signupLoading: false,
    verifyEmailLoading: false,
    googleAuthLoading: false,
    signinLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.signupLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.user = action.payload; // Save the user data
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupLoading = false;
      })
      .addCase(googleAuth.pending, (state) => {
        state.googleAuthLoading = true;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.googleAuthLoading = false;
        state.user = action.payload; // Save the user data
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.googleAuthLoading = false;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.verifyEmailLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.verifyEmailLoading = false;
      })
      .addCase(verifyEmail.rejected, (state) => {
        state.verifyEmailLoading = false;
      })
      .addCase(signInUser.pending, (state) => {
        state.signinLoading = true;
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.signinLoading = false;
      })
      .addCase(signInUser.rejected, (state) => {
        state.signinLoading = false;
      });
  },
});

export default authSlice.reducer;
