import axios, { AxiosError } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { Hotel, HotelInitialState } from "../../types/types";

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
    addHotel(state, action) {
      return {
        ...state,
        hotels: [...state.hotels, action.payload],
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
export const updateHotel = (hotelData: Hotel): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const hotelToUpdate = await axios.put(
        `/hotel/${hotelData.idHotel}`,
        hotelData
      );
      const hotelCreated = await hotelToUpdate.data;
      dispatch(addHotel(hotelCreated));
      dispatch(gethotels());
      dispatch(setIsLoading(false));
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      dispatch(setErrorHotel(axiosError));
    }
  };
};

export const { getHotels, addHotel, setErrorHotel, setIsLoading } =
  hotelSlice.actions;

export default hotelSlice.reducer;
