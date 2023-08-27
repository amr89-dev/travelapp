import { useAppSelector } from "../../hooks/reduxHooks";
import { Reservation } from "../../types/types";
import ReservationRow from "../ReservationRow/ReservationRow";

export const ReservationSectionList = () => {
  const reservations: Reservation[] = useAppSelector(
    (state) => state.reservationReducer
  );

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
              <th>Usuario: </th>
              <th>Hotel:</th>
              <th>Habitación:</th>
              <th>Acciones: </th>
            </tr>
          </thead>
          <tbody className="">
            {reservations.map((reservation) => (
              <ReservationRow />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ReservationSectionList;
