import { ReactNode, createContext, useState, FC } from "react";

interface HandleOpenContextType {
  hotelUpdateOpen: { isOpen: boolean; id: string | undefined };
  handleHotelUpdateOpen: (idHotel: string | undefined) => void;
  roomUpdateOpen: { isOpen: boolean; id: string | undefined };
  reservationFormOpen: { isOpen: boolean; id: string | undefined };
  handleRoomUpdateOpen: (idRoom: string | undefined) => void;
  roomFormOpen: { isOpen: boolean; id: string | undefined };
  handleRoomFormOpen: (idHotel: string | undefined) => void;
  handleReservationFormOpen: (idRoom: string | undefined) => void;
  hotelDetailOpen: { isOpen: boolean; id: string | undefined };
  handleHotelDetailOpen: (idHotel: string | undefined) => void;
  hotelFormOpen: boolean;
  handleHotelFormOpen: () => void;
}

interface HandleOpenProviderProps {
  children: ReactNode;
}

export const HandleOpenContext = createContext<
  HandleOpenContextType | undefined
>(undefined);

const HandleOpenProvider: FC<HandleOpenProviderProps> = ({ children }) => {
  const [hotelUpdateOpen, setHotelUpdateOpen] = useState({
    isOpen: false,
    id: "",
  });
  const [roomUpdateOpen, setRoomUpdateOpen] = useState({
    isOpen: false,
    id: "",
  });
  const [roomFormOpen, setRoomFormOpen] = useState({
    isOpen: false,
    id: "",
  });
  const [reservationFormOpen, setReservationFormOpen] = useState({
    isOpen: false,
    id: "",
  });
  const [hotelDetailOpen, setHotelDetailOpen] = useState({
    isOpen: false,
    id: "",
  });
  const [hotelFormOpen, setHotelFormOpen] = useState(false);

  const handleHotelUpdateOpen = (idHotel: string | undefined) => {
    if (hotelUpdateOpen.isOpen) {
      setHotelUpdateOpen({ isOpen: false, id: "" });
    } else {
      setHotelUpdateOpen({ isOpen: true, id: idHotel || "" });
    }
  };
  const handleRoomUpdateOpen = (idRoom: string | undefined) => {
    if (roomUpdateOpen.isOpen) {
      setRoomUpdateOpen({ isOpen: false, id: "" });
    } else {
      setRoomUpdateOpen({ isOpen: true, id: idRoom || "" });
    }
  };

  const handleRoomFormOpen = (idHotel: string | undefined) => {
    if (roomFormOpen.isOpen) {
      setRoomFormOpen({ isOpen: false, id: "" });
    } else {
      setRoomFormOpen({ isOpen: true, id: idHotel || "" });
    }
  };
  const handleReservationFormOpen = (idRoom: string | undefined) => {
    if (reservationFormOpen.isOpen) {
      setReservationFormOpen({ isOpen: false, id: "" });
    } else {
      setReservationFormOpen({ isOpen: true, id: idRoom || "" });
    }
  };
  const handleHotelDetailOpen = (idHotel: string | undefined) => {
    if (hotelDetailOpen.isOpen) {
      setHotelDetailOpen({ isOpen: false, id: "" });
    } else {
      setHotelDetailOpen({ isOpen: true, id: idHotel || "" });
    }
  };
  const handleHotelFormOpen = () => {
    setHotelFormOpen(!hotelFormOpen);
  };

  const data: HandleOpenContextType = {
    hotelUpdateOpen,
    handleHotelUpdateOpen,
    roomFormOpen,
    handleRoomFormOpen,
    hotelDetailOpen,
    handleHotelDetailOpen,
    hotelFormOpen,
    handleHotelFormOpen,
    roomUpdateOpen,
    handleRoomUpdateOpen,
    handleReservationFormOpen,
    reservationFormOpen,
  };

  return (
    <HandleOpenContext.Provider value={data}>
      {children}
    </HandleOpenContext.Provider>
  );
};

export default HandleOpenProvider;
