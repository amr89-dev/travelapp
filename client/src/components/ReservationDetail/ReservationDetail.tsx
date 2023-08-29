import { useAppSelector } from "../../hooks/reduxHooks";
import { HandleOpenContext } from "../../utils/context";
import { useContext } from "react";

const ReservationDetail = () => {
  const context = useContext(HandleOpenContext);
  const reservation = useAppSelector(
    (state) => state.reservationReducer.reservations
  ).filter(
    (reservation) =>
      reservation.idReservation === context?.reservationDetailOpen.id
  );
  const { userId, room, checkInDate, checkOutDate, guests } = reservation[0];
  const userData = useAppSelector((state) => state.userReducer.users).filter(
    (user) => user.id === userId
  );

  const { name, lastName, email } = userData[0];

  return (
    <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[60%]  p-8 bg-white rounded-lg border flex flex-col justify-center items-center">
      <h2 className="font-bold text-2xl mb-4">Detalle de la reserva</h2>
      <div>
        <p>👤 {`${name} ${lastName}`}</p>
        <p>📧 {email}</p>
        <p>🏨 {room?.hotel?.name}</p>
        <p>
          📅
          {` ${checkInDate
            .slice(0, 10)
            .replace(/-/g, "/")
            .split("/")
            .reverse()
            .join("/")} - ${checkOutDate
            .slice(0, 10)
            .replace(/-/g, "/")
            .split("/")
            .reverse()
            .join("/")}`}
        </p>
        <p>🗺️ {room?.hotel?.address}</p>
        <p>🌍 {`${room?.hotel?.city} - ${room?.hotel?.country}`} </p>
        <p>🛏️ {room?.roomType}</p>
        <div>
          🧳{" "}
          <ul>
            {guests?.map((guest) => (
              <li>
                <p>Nombre y Apellido{guest.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <button
          className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          onClick={() => {
            context?.handleReservationDetailOpen(undefined);
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ReservationDetail;
