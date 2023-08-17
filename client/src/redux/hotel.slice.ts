import axios, { AxiosError } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { Hotel, HotelInitialState } from "../types/types";

const initialState: HotelInitialState = {
  hotels: [],
  error: null,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    getHotels(state, action) {
      return {
        ...state,
        hotels: action.payload,
      };
    },
    getHotel(state, action) {
      return {
        ...state,
        hotels: action.payload, //filtro para un solo hotel
      };
    },
    addHotel(state, action) {
      return {
        ...state,
        user: action.payload, // agrega un hotel  que ya gesionamos con el thunk
      };
    },
    updateHotel(state, action) {
      return {
        ...state,
        user: action.payload, // actualiza un hotel
      };
    },
    deleteHotel(state, action) {
      return {
        ...state,
        user: action.payload, // elimina un hotel
      };
    },
    setErrorHotel(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});
export const createHotel = (hotelData: Hotel): AppThunk => {
  return async (dispatch) => {
    try {
      const hotelToCreate = await axios.post("/hotel", hotelData);
      const hotelCreated = await hotelToCreate.data;
      console.log(hotelCreated);
      dispatch(addHotel(hotelCreated));
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      dispatch(setErrorHotel(axiosError));
    }
  };
};
export const gethotels = (): AppThunk => {
  return async (dispatch) => {
    try {
      const hotelResponse = await axios.get("/hotel");
      const hotels = await hotelResponse.data;
      dispatch(getHotels(hotels));
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      dispatch(setErrorHotel(axiosError));
    }
  };
};

export const {
  getHotels,
  getHotel,
  addHotel,
  updateHotel,
  deleteHotel,
  setErrorHotel,
} = hotelSlice.actions;

export default hotelSlice.reducer;
