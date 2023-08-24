import { useAppSelector } from "../../hooks/reduxHooks";
import { Room } from "../../types/types";
import RoomRow from "../RoomRow/RoomRow";

const RoomSectionCards = () => {
  const rooms: Room[] = useAppSelector((state) => state.roomReducer.rooms);

  return (
    <div className="flex flex-col w-full">
      <header className="w-full h-1/3  flex flex-col items-center justify-center gap-4 mt-4 shadow-sm">
        <h2 className="font-bold text-xl ">Habitaciones</h2>
        <p>Ver, agregar y editar habitaciones</p>
        <input
          type="search"
          placeholder="Filtrar habitaciones"
          name=""
          id=""
          className="border rounded-md p-1"
        />
        <div className="flex flex-row items-center justify-center gap-4"></div>
      </header>

      <main className="p-4">
        <table width="100%">
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
      </main>
    </div>
  );
};

export default RoomSectionCards;
