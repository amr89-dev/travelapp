import { AxiosError } from "axios";

export type childrenProps = {
  children: React.ReactNode;
};
export type sideBarProps = {
  handleView: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export type hotelInformationProps = {
  hotel: Hotel;
};
export type updateHotelFormProps = {
  handleOpen: () => void;
  hotel?: Hotel;
};
export type updateRoomFormProps = {
  handleOpen: () => void;
  room?: Room;
};
export type SearchBarProps = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export type UserProfileNavBarProps = {
  handleLogout: () => void;
  profile: UserLogin;
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
export interface UserLogin {
  email: string;
  password?: string;
  id?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
}
export interface UserInitialState {
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
  error: string | null;
  isLoading: boolean;
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
  resevations?: Date;
};
export interface RoomInitialState {
  rooms: Room[];
  error: string | null;
  isLoading: boolean;
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
