import { useContext } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RoomCardProps } from "../../types/types";
import { HandleOpenContext } from "../../utils/context";

const RoomRow = ({ roomData, index }: RoomCardProps) => {
  const context = useContext(HandleOpenContext);
  const {
    hotelId,
    idRoom,
    roomType,
    roomPrice,
    roomLocation,
    available,
    roomTaxes,
    netIncome,
  } = roomData;

  const hotelName = useAppSelector((state) => state.hotelReducer.hotels).filter(
    (hotel) => hotel.idHotel === hotelId
  )[0].name;

  return (
    <tr
      className={`${
        index ? (index % 2 === 0 ? "bg-white" : "bg-blue-100/disabled") : 0
      }  gap-2 group hover:bg-blue-600 hover:text-white text-gray-900"  ${
        available ? "text-gray-900" : "text-gray-400"
      }`}
    >
      <td>{hotelName}</td>
      <td>{`${roomType}`}</td>
      <td>{`${roomLocation}`}</td>
      <td>$ {roomPrice}</td>
      <td>{roomTaxes}%</td>
      <td>$ {netIncome}</td>
      <td>{available ? "Disponible" : "No disponible"}</td>
      <td className="flex flex-row justify-start gap-2">
        <button
          className="border border-black group-hover:border-white rounded-lg p-1"
          onClick={() => {
            context?.handleReservationFormOpen(idRoom);
          }}
        >
          Reservar
        </button>

        <button
          className="border border-black group-hover:border-white rounded-lg p-1"
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
