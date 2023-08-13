import { UserActionTypes, UserAction } from "../action-types/action-types";

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

export const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case UserActionTypes.CREATE_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    default:
      return state;
  }
};
