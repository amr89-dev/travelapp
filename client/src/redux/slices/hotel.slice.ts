import axios, { AxiosError } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { Hotel, HotelInitialState } from "../../types/types";

const initialState: HotelInitialState = {
  hotels: [],
  error: null,
  success: null,
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
    setSuccess(state, action) {
      return {
        ...state,
        success: action.payload,
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
      const hotelToCreate = await axios.post("/hotel", hotelData);
      const hotelCreated = await hotelToCreate.data;
      dispatch(addHotel(hotelCreated));
      dispatch(gethotels());
      dispatch(setSuccess(true));
    } catch (err) {
      const axiosError = err as AxiosError;
      dispatch(setErrorHotel(axiosError.response?.data));
    }
  };
};
export const updateHotel = (hotelData: Hotel): AppThunk => {
  return async (dispatch) => {
    try {
      const hotelToUpdate = await axios.put(
        `/hotel/${hotelData.idHotel}`,
        hotelData
      );
      const hotelCreated = await hotelToUpdate.data;
      dispatch(addHotel(hotelCreated));
      dispatch(setSuccess(false));
      dispatch(gethotels());
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      dispatch(setErrorHotel(axiosError));
    }
  };
};

export const { getHotels, addHotel, setErrorHotel, setSuccess } =
  hotelSlice.actions;

export default hotelSlice.reducer;
