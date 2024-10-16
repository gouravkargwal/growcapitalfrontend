import authReducer from "@/Feature/Auth/authSlice";
import languageReducer from "@/Feature/Language/languageSlice";
import viewReducer from "@/Feature/home/homeSlice";
import referReducer from "@/Feature/Refer/referSlice";
import rewardReducer from "@/Feature/Reward/rewardSlice";
import userReducer from "@/Feature/User/userSlice";
import planReducer from "@/Feature/Plan/planSlice";
import stockReducer from "@/Feature/Stock/stockSlice";
import snackbarReducer from "@/Feature/Snackbar/snackbarSlice";
import newsReducer from "@/Feature/News/newsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    view: viewReducer,
    refer: referReducer,
    reward: rewardReducer,
    user: userReducer,
    plan: planReducer,
    stock: stockReducer,
    snackbar: snackbarReducer,
    news: newsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
