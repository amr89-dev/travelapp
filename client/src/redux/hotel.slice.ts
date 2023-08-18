import axios, { AxiosError } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { Hotel, HotelInitialState } from "../types/types";

const initialState: HotelInitialState = {
  hotels: [],
  error: null,
  isLoading: false,
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
        hotels: [...state.hotels, action.payload],
      };
    },
    updateHotel(state, action) {
      return {
        ...state,
        hotels: action.payload, // actualiza un hotel
      };
    },
    deleteHotel(state, action) {
      return {
        ...state,
        hotels: action.payload, // elimina un hotel
      };
    },
    setErrorHotel(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    setIsLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
});
export const createHotel = (hotelData: Hotel): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const hotelToCreate = await axios.post("/hotel", hotelData);
      const hotelCreated = await hotelToCreate.data;
      dispatch(addHotel(hotelCreated));
      dispatch(setIsLoading(false));
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
    } catch (error) {
      const axiosError = error as AxiosError;

      dispatch(setErrorHotel(axiosError.response?.data));
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
  setIsLoading,
} = hotelSlice.actions;

export default hotelSlice.reducer;
