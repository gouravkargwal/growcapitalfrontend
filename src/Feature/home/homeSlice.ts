import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ViewState {
  currentView: string;
}

const initialState: ViewState = {
  currentView: "MainContent",
};

const homeSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<string>) => {
      state.currentView = action.payload;
    },
  },
});

export const { setView } = homeSlice.actions;
export default homeSlice.reducer;
