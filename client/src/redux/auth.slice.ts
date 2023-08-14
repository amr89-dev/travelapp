import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getAuth(state, action) {
      return { ...state, isAuthenticated: action.payload };
    },
  },
});

export const { getAuth } = authSlice.actions;

export default authSlice.reducer;
