import { AxiosError } from "axios";

export type childrenProps = {
  children: React.ReactNode;
};

/*----- REDUX ------*/

//USER
export enum UserGender {
  MASCULINE = "masculine",
  FEMININE = "feminine",
  NEUTER = "neuter",
}
export type User = {
  email: string;
  name: string;
  lastName: string;
  password: string;
  birthdate: string;
  gender: UserGender;
  documentType: string;
  documentNumber: string;
  phone: string;
};
export interface UserInitialState {
  user: User;
  error: AxiosError | string | null;
}

//HOTEL
export type Hotel = {
  idHotel: string;
  name: string;
  address: string;
  city: string;
  country: string;
  available: true;
  description: string;
  rooms: Room[];
};

export interface HotelInitialState {
  hotels: Hotel[];
  error: string | null;
}
//ROOM
export type Room = {
  idRoom: string;
  roomType: string;
  roomPrice: number;
  roomLocation: string;
  available: boolean;
  hotelId: string;
};
