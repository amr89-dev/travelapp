import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import userReducer from "./slices/user.slice";
import hotelReducer from "./slices/hotel.slice";
import roomReducer from "./slices/room.slice";
import reservationReducer from "./slices/reservations.slice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    userReducer: userReducer,
    hotelReducer: hotelReducer,
    roomReducer: roomReducer,
    reservationReducer: reservationReducer,
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
