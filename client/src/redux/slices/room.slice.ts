import { createSlice } from "@reduxjs/toolkit";
import { Room, RoomInitialState } from "../../types/types";
import { AppThunk } from "../store";
import axios, { AxiosError } from "axios";
import { gethotels } from "./hotel.slice";

const initialState: RoomInitialState = {
  rooms: [],
  error: null,
  success: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, action) {
      return {
        ...state,
        rooms: action.payload,
      };
    },
    addRooms(state, action) {
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    },
    setSucces(state, action) {
      return {
        ...state,
        success: action.payload,
      };
    },
    setErrorRoom(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const getRooms = (): AppThunk => {
  return async (dispatch) => {
    try {
      const roomsResonse = await axios.get("/room");
      const rooms = await roomsResonse.data;
      dispatch(setRooms(rooms));
    } catch (error) {
      const axiosError = error as AxiosError;

      dispatch(setErrorRoom(axiosError.response?.data));
    }
  };
};
export const createRoom = (roomData: Room): AppThunk => {
  return async (dispatch) => {
    try {
      const hotelToCreate = await axios.post("/room", roomData);
      const hotelCreated = await hotelToCreate.data;
      dispatch(addRooms(hotelCreated));
      dispatch(gethotels());
      dispatch(getRooms());
      dispatch(setSucces(true));
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      dispatch(setErrorRoom(axiosError));
    }
  };
};
export const updateRoom = (roomData: Room): AppThunk => {
  return async (dispatch) => {
    try {
      const roomToUpdate = await axios.put(
        `/room/${roomData.idRoom}`,
        roomData
      );
      const roomUpdated = await roomToUpdate.data;
      dispatch(addRooms(roomUpdated));
      dispatch(getRooms());
      dispatch(setSucces(true));
    } catch (err) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      dispatch(setErrorRoom(axiosError));
    }
  };
};

export const { setRooms, addRooms, setSucces, setErrorRoom } =
  roomSlice.actions;
export default roomSlice.reducer;
