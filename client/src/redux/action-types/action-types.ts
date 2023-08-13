//AUTH
export enum AuthActionTypes {
  GET_AUTH = "GET_AUTH",
}

export type AuthAction = {
  type: AuthActionTypes;
  payload: boolean;
};

//USER
export enum UserActionTypes {
  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
  GET_USER = "GET_USER",
}
export type User = {
  name: string;
  email: string;
};
export type UserAction = {
  type: UserActionTypes;
  payload: User;
};
