import { Hotel, User } from "../types/types";

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

export type UserAction = {
  type: UserActionTypes;
  payload: User;
};

//HOTEL
export enum HotelActionTypes {
  GET_HOTEL = "GET_HOTEL",
  CREATE_HOTEL = "CREATE_HOTEL",
}

export type HotelAction = {
  type: HotelActionTypes;
  payload: Hotel;
};

//ROOM
