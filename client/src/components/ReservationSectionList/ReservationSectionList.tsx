import { useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Reservation, SortBy } from "../../types/types";
import ReservationRow from "../ReservationRow/ReservationRow";

export const ReservationSectionList = () => {
  const reservations: Reservation[] = useAppSelector(
    (state) => state.reservationReducer.reservations
  );
  const users = useAppSelector((state) => state.userReducer.users);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterUser, setFilterUser] = useState<string | null>(null);
  const [sortingDirection, setsortingDirection] = useState(false);

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
    setsortingDirection(!sortingDirection);
  };

  const filteredReservations = useMemo(() => {
    return filterUser != null && filterUser.length > 0
      ? reservations.filter((reservation) => {
          return reservation.userId === filterUser;
        })
      : reservations;
  }, [reservations, filterUser]);

  const sortedReservations = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredReservations;

    const compareProperties: Record<
      string,
      (reservation: Reservation) => string | undefined
    > = {
      [SortBy.USER]: (reservation) => reservation.userId,
      [SortBy.HOTEL]: (reservation) => reservation?.room?.hotel?.name,
      [SortBy.CITY]: (reservation) => reservation.room?.hotel?.city,
      [SortBy.DATE]: (reservation) => reservation.checkInDate,
    };

    return [...filteredReservations].sort((a, b) => {
      const extractProperty = compareProperties[sorting];

      const propertyA = extractProperty(a);
      const propertyB = extractProperty(b);

      return propertyA && propertyB
        ? sortingDirection
          ? propertyB.localeCompare(propertyA)
          : propertyA.localeCompare(propertyB)
        : 0;
    });
  }, [filteredReservations, sorting, sortingDirection]);
  return (
    <>
      <header className="h-1/3  flex flex-col items-center justify-center gap-4 m-4 mb-0">
        <h2 className="font-bold text-2xl">Reservas</h2>
        <p>Ver, agregar y editar reservas</p>
        <input
          className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          list="hotels"
          name="idHotel"
          placeholder="Filtra por usuario"
          onChange={(e) => {
            setFilterUser(e.target.value);
          }}
        />
        <datalist
          id="hotels"
          className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option disabled>Elige un usuario</option>
          {users.map((el) => (
            <option key={el.id} value={el.id}>{`${el.name}`}</option>
          ))}
        </datalist>
        <div className="flex flex-row items-center justify-center gap-4"></div>
      </header>
      <table width="100%" cellPadding="10%">
        <thead className="bg-blue-600 text-white">
          <tr className=" text-left">
            <th
              className="cursor-pointer hover:bg-blue-500"
              onClick={() => {
                handleChangeSort(SortBy.USER);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
              Usuario:
            </th>
            <th
              className=" cursor-pointer hover:bg-blue-500"
              onClick={() => {
                handleChangeSort(SortBy.HOTEL);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
              Hotel:
            </th>
            <th
              className="cursor-pointer hover:bg-blue-500"
              onClick={() => {
                handleChangeSort(SortBy.CITY);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
              Ciudad:
            </th>
            <th
              className="cursor-pointer hover:bg-blue-500"
              onClick={() => {
                handleChangeSort(SortBy.DATE);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
              Fechas de entrada y salida:
            </th>

            <th>Acciones: </th>
          </tr>
        </thead>
        <tbody>
          {sortedReservations.map((reservation, i) => (
            <ReservationRow
              key={reservation.idReservation}
              index={i}
              reservationData={reservation}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ReservationSectionList;
