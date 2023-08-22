import { useAppSelector } from "../../hooks/reduxHooks";
import { Room } from "../../types/types";
import RoomRow from "../RoomRow/RoomRow";

const RoomSectionCards = () => {
  const rooms: Room[] = useAppSelector((state) => state.roomReducer.rooms);

  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th>Hotel:</th>
          <th>Tipo:</th>
          <th>Precio: </th>
          <th>Ubicación: </th>
          <th>Disponibilidad: </th>
          <th>Acciones: </th>
        </tr>
      </thead>
      <tbody className="">
        {rooms.map((room) => (
          <RoomRow key={room.idRoom} roomData={room} />
        ))}
      </tbody>
    </table>
  );
};

export default RoomSectionCards;
