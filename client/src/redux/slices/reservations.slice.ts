import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios, { AxiosError } from "axios";
import { Reservation } from "../../types/types";

const initialState = {
  reservations: [],
  error: null,
  success: null,
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    getReservations(state, action) {
      return {
        ...state,
        reservations: action.payload,
      };
    },
    setError(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    setSuccess(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});
export const loadReservations = (): AppThunk => {
  return async (dispatch) => {
    try {
      const reservationsRes = await axios.get("/reservation");
      const reservations = await reservationsRes.data;
      dispatch(getReservations(reservations));
    } catch (error) {
      const axiosError = error as AxiosError;

      dispatch(setError(axiosError.response?.data));
    }
  };
};
export const createReservation = (reservationData: Reservation): AppThunk => {
  return async (dispatch) => {
    try {
      const reservationToCreate = await axios.post(
        "/reservation",
        reservationData
      );
      await reservationToCreate.data;
      dispatch(loadReservations());
      dispatch(setSuccess(true));
    } catch (err) {
      const axiosError = err as AxiosError;
      dispatch(setError(axiosError.response?.data));
    }
  };
};
export const { getReservations, setError, setSuccess } =
  reservationSlice.actions;
export default reservationSlice.reducer;
