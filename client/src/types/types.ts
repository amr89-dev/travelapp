import { AxiosError } from "axios";
import { NavLinkProps } from "react-router-dom";

export type childrenProps = {
  children: React.ReactNode;
};
export type sideBarProps = {
  handleView: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export type hotelInformationProps = {
  hotel: Hotel;
  rooms?: Room[];
};
export type updateHotelFormProps = {
  hotel?: Hotel;
};
export type updateRoomFormProps = {
  room?: Room;
};
export type SearchBarProps = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputSearch: InputSearch;
};
export type UserProfileNavBarProps = {
  profile: UserLogin;
};
export interface CustomNavLinkProps extends NavLinkProps {
  isActive?: boolean;
}
export interface InputSearch {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: string;
}
export enum SortBy {
  NONE = "none",
  NAME = "name",
  CITY = "city",
  COUNTRY = "country",
  HOTEL = "idHotel",
  TYPE = "roomType",
  PRICE = "roomPrice",
  LOCATION = "roomLocation",
  INCOME = "netIncome",
  TAXES = "roomTaxes",
  AVAILABLE = "available",
}

/*----- REDUX ------*/

//USER
export enum UserGender {
  MASCULINE = "masculine",
  FEMININE = "feminine",
  NEUTER = "neuter",
}
export type User = {
  id?: string;
  email: string;
  name: string;
  lastName: string;
  password: string;
  birthdate: string;
  gender: UserGender;
  documentType: string;
  documentNumber: string;
  phone: string;
  role?: string;
};
export interface UserLogin {
  email: string;
  password?: string;
  id?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
  userDetails?: UserLogin;
  name?: string;
}
export interface UserInitialState {
  users: User[];
  user: User;
  error: AxiosError | null;
  success: boolean | null;
}

//HOTEL
export interface Hotel {
  idHotel?: string;
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  available?: boolean;
  description?: string;
  rooms?: Room[];
  image?: string;
  favorite?: boolean;
}

export interface HotelInitialState {
  hotels: Hotel[];
  results: Hotel[];
  error: AxiosError | null;
  success: boolean | null;
}

export interface HotelCardProps {
  hotelData: Hotel;
  index?: number;
}
//ROOM
export type Room = {
  idRoom?: string;
  numRooms?: number;
  roomType?: string;
  roomPrice?: string;
  roomTaxes?: string;
  roomLocation?: string;
  available?: boolean;
  hotelId?: string;
  resevations?: Date[] | undefined;
  netIncome?: string;
  hotel?: Hotel;
  roomCapacity: number;
};
export interface RoomInitialState {
  rooms: Room[];
  error: AxiosError | null;
  success: boolean | null;
}
export interface ReservationInitialState {
  reservations: Reservation[];
  error: AxiosError | null;
  success: boolean | null;
}
export interface RoomFormProps {
  handleOpenRoomForm: () => void;
}
export interface RoomCardProps {
  roomData: Room;
  index: number;
}
export interface ReservationCardProps {
  reservationData: Reservation;
  index: number;
}

//LOGIN
export interface LoginInitialState {
  isAuthenticated: boolean;
  loggedUser: UserLogin;
  error: AxiosError | null;
  success: boolean | null;
}

//RESERVATION
export type Reservation = {
  idReservation?: string;
  checkInDate: string;
  checkOutDate: string;
  userId: string;
  guests?: Guest[];
  idRoom?: string;
  room?: Room;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
};

export interface UpdateReservationFormProps {
  reservation: Reservation;
}

//GUEST
export type Guest = {
  idGuest?: string;
  email: string;
  name: string;
  lastName: string;
  birthdate: string;
  gender: UserGender;
  documentType: string;
  documentNumber: string;
  phone: string;
};
