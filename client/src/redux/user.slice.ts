import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "./action-types";
import { AppThunk } from "./store";
const endpoint = "http://localhost:3001/user";

interface UserState {
  user: {
    id: number;
    name: string;
    email: string;
  };
  error: string | null;
}

const initialState: UserState = {
  user: {
    id: 0,
    name: "",
    email: "",
  },
  error: null,
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
    addUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});
export const createUser = (userData: User): AppThunk => {
  return async (dispatch) => {
    try {
      const userToCreate = await axios.post(endpoint, userData);
      const userCreated = await userToCreate.data;
      dispatch(addUser(userCreated));
    } catch (err) {
      console.log(err);
    }
  };
};

export const { getUser, addUser } = userSlice.actions;

export default userSlice.reducer;
