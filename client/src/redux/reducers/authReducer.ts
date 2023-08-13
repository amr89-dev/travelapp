import { AuthActionTypes, AuthAction } from "../action-types/action-types";

const initialState = {
  isAuthenticated: true,
};

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.GET_AUTH:
      {
        return { ...state, isAuthenticated: action.payload };
      }
      break;
    default:
      return state;
  }
};

export default authReducer;
