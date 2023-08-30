import { createSlice } from "@reduxjs/toolkit";
import { LoginInitialState, UserLogin } from "../../types/types";
import { AppThunk } from "../store";
import axios, { AxiosError } from "axios";

const initialState: LoginInitialState = {
  isAuthenticated: false,
  loggedUser: {
    email: "",
    password: "",
    id: "",
    role: "",
  },
  success: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getAuth(state, action) {
      return { ...state, isAuthenticated: action.payload };
    },
    setLoggedUser(state, action) {
      return { ...state, loggedUser: action.payload };
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

export const loginUser = (userData: UserLogin): AppThunk => {
  return async (dispatch) => {
    try {
      const userToLogin = await axios.post("/login", userData);
      const userLogged = await userToLogin.data;

      dispatch(setSuccess(true));
      dispatch(getAuth(true));
      dispatch(setLoggedUser(userLogged));
      localStorage.setItem(
        "userLogged",
        JSON.stringify(userLogged.userDetails)
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        dispatch(setError(axiosError?.response?.data));
      }
    }
  };
};

export const { getAuth, setSuccess, setError, setLoggedUser } =
  authSlice.actions;

export default authSlice.reducer;
