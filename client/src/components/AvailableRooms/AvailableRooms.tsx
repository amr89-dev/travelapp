import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import ReservationUserForm from "../ReservationUserForm/ReservationUserForm";
import { useState } from "react";

const AvailableRooms = () => {
  const [formIsOpen, setformIsOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const rooms = useAppSelector((state) => state.roomReducer.rooms);
  const id = useParams().id;
  const roomsToRender = rooms.filter((room) => room.hotelId === id);

  const handleOpenForm = () => {
    setformIsOpen(!formIsOpen);
  };
  return (
    <div className="flex flex-col items-center">
      <h2>Habitaciones disponibles en el hotel </h2>
      <table width="100%">
        <thead>
          <th>Tipo:</th>
          <th>Ubicación:</th>
          <th>Precio:</th>
          <th>Acciones:</th>
        </thead>
        <tbody>
          {roomsToRender.map((room) => (
            <tr>
              <td>{room.roomType}</td>
              <td>{room.roomLocation}</td>
              <td>$ {room.roomPrice}</td>
              <td>
                <button
                  onClick={() => {
                    setRoomId(room.idRoom || "");
                    handleOpenForm();
                  }}
                >
                  Reservar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {formIsOpen && (
        <ReservationUserForm handleOpenForm={handleOpenForm} idRoom={roomId} />
      )}
    </div>
  );
};

export default AvailableRooms;
