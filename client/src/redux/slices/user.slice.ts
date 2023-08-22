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
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state) {
      return {
        ...state,
      };
    },
    addUser(state, action: PayloadAction<User>) {
      return {
        ...state,
        user: action.payload,
        error: null,
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
      dispatch(setSuccess(true));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        dispatch(setError(axiosError?.response?.data));
      }
    }
  };
};

export const { getUser, addUser, setError, setSuccess } = userSlice.actions;

export default userSlice.reducer;
