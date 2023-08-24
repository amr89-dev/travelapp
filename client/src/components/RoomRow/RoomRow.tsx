import { useContext } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RoomCardProps } from "../../types/types";
import { HandleOpenContext } from "../../utils/context";

const RoomRow = ({ roomData }: RoomCardProps) => {
  const context = useContext(HandleOpenContext);
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
        <button
          onClick={() => {
            context?.handleReservationFormOpen(idRoom);
          }}
        >
          Reservar
        </button>
        <button>Ver reservas</button>
        <button
          onClick={() => {
            context?.handleRoomUpdateOpen(idRoom);
          }}
        >
          Editar habitación
        </button>
      </td>
    </tr>
  );
};

export default RoomRow;
