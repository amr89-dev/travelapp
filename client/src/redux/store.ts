import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import userReducer from "./user.slice";
import hotelReducer from "./hotel.slice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    userReducer: userReducer,
    hotelReducer: hotelReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
