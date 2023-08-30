import { useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Room, SortBy } from "../../types/types";
import RoomRow from "../RoomRow/RoomRow";

const RoomSectionCards = () => {
  const hotels = useAppSelector((state) => state.hotelReducer.hotels);
  const rooms: Room[] = useAppSelector((state) => state.roomReducer.rooms);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [sortingDirection, setsortingDirection] = useState(false);
  const [filterHotel, setFilterHotel] = useState<string | null>(null);

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
    setsortingDirection(!sortingDirection);
  };
  const filteredRooms = useMemo(() => {
    return filterHotel != null && filterHotel.length > 0
      ? rooms.filter((room) => {
          return room.hotelId === filterHotel;
        })
      : rooms;
  }, [rooms, filterHotel]);

  const sortedRooms = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredRooms;

    const compareProperties: Record<
      string,
      (room: Room) => string | undefined
    > = {
      [SortBy.HOTEL]: (room) => room.hotelId,
      [SortBy.TYPE]: (room) => room.roomType,
      [SortBy.PRICE]: (room) => room.roomPrice,
      [SortBy.LOCATION]: (room) => room.roomLocation,
      [SortBy.INCOME]: (room) => room.netIncome,
      [SortBy.TAXES]: (room) => room.roomTaxes,
      [SortBy.AVAILABLE]: (room) =>
        room.available ? "Disponible" : "No disponible",
    };

    return [...filteredRooms].sort((a, b) => {
      const extractProperty = compareProperties[sorting];

      const propertyA =
        typeof extractProperty(a) === "number"
          ? extractProperty(a)?.toString()
          : extractProperty(a);

      const propertyB =
        typeof extractProperty(b) === "number"
          ? extractProperty(b)?.toString()
          : extractProperty(b);

      return propertyA && propertyB
        ? sortingDirection
          ? propertyB.localeCompare(propertyA)
          : propertyA.localeCompare(propertyB)
        : 0;
    });
  }, [filteredRooms, sorting, sortingDirection]);

  return (
    <>
      <header className="h-1/3  flex flex-col items-center justify-center gap-4 m-4 mb-0">
        <h2 className="font-bold text-2xl">Habitaciones</h2>
        <p>Ver, agregar y editar habitaciones</p>
        <input
          className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          list="hotels"
          name="idHotel"
          placeholder="Filtra por hotel"
          onChange={(e) => {
            setFilterHotel(e.target.value);
          }}
        />
        <datalist
          id="hotels"
          className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option disabled>Elige un hotel</option>
          {hotels.map((el) => (
            <option key={el.idHotel} value={el.idHotel}>{`${el.name}`}</option>
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
              className=" cursor-pointer hover:bg-blue-500"
              onClick={() => {
                handleChangeSort(SortBy.TYPE);
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
              Tipo:
            </th>
            <th
              className="cursor-pointer hover:bg-blue-500"
              onClick={() => {
                handleChangeSort(SortBy.LOCATION);
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
              Ubicación:
            </th>
            <th
              className="cursor-pointer hover:bg-blue-500"
              onClick={() => {
                handleChangeSort(SortBy.PRICE);
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
              Precio:
            </th>
            <th
              className="cursor-pointer hover:bg-blue-500"
              onClick={() => {
                handleChangeSort(SortBy.TAXES);
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
              Impuestos:
            </th>
            <th
              className="cursor-pointer hover:bg-blue-500"
              onClick={() => {
                handleChangeSort(SortBy.INCOME);
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
              Ganancia:
            </th>
            <th
              className="cursor-pointer hover:bg-blue-500"
              onClick={() => {
                handleChangeSort(SortBy.AVAILABLE);
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
              Disponibilidad:
            </th>
            <th>Acciones: </th>
          </tr>
        </thead>
        <tbody>
          {sortedRooms.map((room, i) => (
            <RoomRow key={room.idRoom} roomData={room} index={i} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RoomSectionCards;
