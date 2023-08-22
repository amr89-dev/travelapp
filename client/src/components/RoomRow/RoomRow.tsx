import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RoomCardProps } from "../../types/types";
import { Link } from "react-router-dom";
import UpdateRoomForm from "../UpdateRoomForm/UpdateRoomForm";

const RoomRow = ({ roomData }: RoomCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const { hotelId, idRoom, roomType, roomPrice, roomLocation, available } =
    roomData;

  const hotelName = useAppSelector((state) => state.hotelReducer.hotels).filter(
    (hotel) => hotel.idHotel === hotelId
  )[0].name;

  return (
    <tr>
      <td>{hotelName}</td>
      <td>{`${roomType}`}</td>
      <td>{`${roomPrice}`}</td>
      <td>{`${roomLocation}`}</td>
      <td>{available ? "Disponible" : "No disponible"}</td>
      <td className="flex flex-row justify-around gap-2">
        <Link to={`/room/${idRoom}`}>Ver</Link>
        <button
          onClick={() => {
            handleOpen();
          }}
        >
          Editar
        </button>
        <Link to={`/create-room/${hotelId}`}>Reservar</Link>
      </td>

      {isOpen && <UpdateRoomForm handleOpen={handleOpen} room={roomData} />}
    </tr>
  );
};

export default RoomRow;
