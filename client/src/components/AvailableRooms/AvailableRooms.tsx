import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

const AvailableRooms = () => {
  const navigate = useNavigate();
  const rooms = useAppSelector((state) => state.roomReducer.rooms);
  const id = useParams().id;
  const roomsToRender = rooms.filter((room) => room.hotelId === id);
  const hotelName = useAppSelector((state) => state.hotelReducer.hotels).filter(
    (hotel) => hotel.idHotel === id
  )[0].name;

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-2xl m-4">
        Habitaciones disponibles en el hotel <i>{hotelName}</i>
      </h2>
      <table width="50%" className=" border-separate border-spacing-2">
        <thead className="bg-blue-600 text-white text-center">
          <th className="rounded-lg p-3 ">Tipo:</th>
          <th className="rounded-lg p-3 ">Ubicación:</th>
          <th className="rounded-lg p-3 ">Precio:</th>
          <th className="rounded-lg p-3 ">Acciones:</th>
        </thead>
        <tbody>
          {roomsToRender.map((room, index) => (
            <tr
              className={`${
                index
                  ? index % 2 === 0
                    ? "bg-white"
                    : "bg-blue-100/disabled"
                  : 0
              }  gap-2 group text-gray-900 hover:shadow-sm`}
            >
              <td
                className={`${
                  index ? (index % 2 === 0 ? "" : "rounded-lg") : 0
                } text-center p-4 `}
              >{`${room.roomType}`}</td>
              <td
                className={`${
                  index ? (index % 2 === 0 ? "" : "rounded-lg") : 0
                } text-center p-4 `}
              >{`${room.roomLocation}`}</td>
              <td
                className={`${
                  index ? (index % 2 === 0 ? "" : "rounded-lg") : 0
                } text-center p-4 `}
              >
                $ {room.roomPrice}
              </td>

              <td className="flex flex-row border rounded-lg justify-start p-4 gap-2">
                <button
                  className="w-full h-full   rounded-lg "
                  onClick={() => {
                    navigate(`/reservation/${room.idRoom}`);
                  }}
                >
                  Reservar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableRooms;
