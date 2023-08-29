import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios, { AxiosError } from "axios";
import { Reservation, ReservationInitialState } from "../../types/types";

const initialState: ReservationInitialState = {
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
    addReservation(state, action) {
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      };
    },
    delReservation(state, action) {
      return {
        ...state,
        reservations: state.reservations.filter(
          (el) => el.idReservation !== action.payload
        ),
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
        success: action.payload,
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
export const updateRerservation = (reservationData: Reservation): AppThunk => {
  return async (dispatch) => {
    try {
      const reservationToUpdate = await axios.put(
        `/reservation`,
        reservationData
      );
      const reservationUpdated = await reservationToUpdate.data;
      dispatch(addReservation(reservationUpdated));
      dispatch(loadReservations());
      dispatch(setSuccess(true));
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      dispatch(setError(axiosError.response?.data));
    }
  };
};

export const deleteReservation = (idReservation: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(delReservation(idReservation));
      await axios.delete(`/reservation/${idReservation}`);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      dispatch(setError(axiosError.response?.data));
    }
  };
};
export const {
  getReservations,
  setError,
  setSuccess,
  addReservation,
  delReservation,
} = reservationSlice.actions;
export default reservationSlice.reducer;
