import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeT = {
  mode: "light" | "dark" | "system";
};

const initialState: ThemeT = { mode: "system" };
const ThemeSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    changeThemeTo: (state, action: PayloadAction<ThemeT>) => {
      state.mode = action.payload.mode;
    },
  },
});

export const { changeThemeTo } = ThemeSlice.actions;
export default ThemeSlice.reducer;
