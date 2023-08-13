import { UserActionTypes, UserAction } from "../action-types/action-types";

export const createUser = (): UserAction => {
  return {
    type: UserActionTypes.CREATE_USER,
    payload: { name: "", email: "" },
  };
};
