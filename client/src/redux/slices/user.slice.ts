import axios, { AxiosError } from "axios";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserGender, UserInitialState } from "../../types/types";
import { AppThunk } from "../store";

const initialState: UserInitialState = {
  user: {
    email: "",
    name: "",
    lastName: "",
    password: "",
    birthdate: "",
    gender: UserGender.NEUTER,
    documentType: "",
    documentNumber: "",
    phone: "",
    role: "",
  },
  users: [],
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    },
    getAllUsers(state, action) {
      return {
        ...state,
        users: action.payload,
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
export const createUser = (userData: User): AppThunk => {
  return async (dispatch) => {
    try {
      const userToCreate = await axios.post("/user", userData);
      const userCreated = await userToCreate.data;
      dispatch(addUser(userCreated));
      dispatch(loadAllUsers());
      dispatch(setSuccess(true));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        dispatch(setError(axiosError?.response?.data));
      }
    }
  };
};

export const loadAllUsers = (): AppThunk => {
  return async (dispatch) => {
    try {
      const usersFetch = await axios.get("/user");
      const usersData = await usersFetch.data;
      dispatch(getAllUsers(usersData));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        dispatch(setError(axiosError?.response?.data));
      }
    }
  };
};

export const { addUser, getAllUsers, setError, setSuccess } = userSlice.actions;

export default userSlice.reducer;
