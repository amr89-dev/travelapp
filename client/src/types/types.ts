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
};
export type UserProfileNavBarProps = {
  handleLogout: () => void;
  profile: UserLogin;
};
export interface CustomNavLinkProps extends NavLinkProps {
  isActive?: boolean;
}

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
export type Hotel = {
  idHotel?: string;
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  available?: boolean;
  description?: string;
  rooms?: Room[];
  image?: string;
};

export interface HotelInitialState {
  hotels: Hotel[];
  error: AxiosError | null;
  success: boolean | null;
}

export interface HotelCardProps {
  hotelData: Hotel;
}
//ROOM
export type Room = {
  idRoom?: string;
  numRooms?: number;
  roomType?: string;
  roomPrice?: string;
  roomLocation?: string;
  available?: boolean;
  hotelId?: string;
  resevations?: Date[] | undefined;
};
export interface RoomInitialState {
  rooms: Room[];
  error: AxiosError | null;
  success: boolean | null;
}
export interface RoomFormProps {
  handleOpenRoomForm: () => void;
}
export interface RoomCardProps {
  roomData: Room;
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
  idRoom: string;
  checkInDate: string;
  checkOutDate: string;
  userId: string;
};
