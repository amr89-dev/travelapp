import { AuthAction, AuthActionTypes } from "../action-types/action-types";

export const getAuth = (): AuthAction => {
  return { type: AuthActionTypes.GET_AUTH, payload: true };
};
