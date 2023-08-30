import { useAppSelector } from "../../hooks/reduxHooks";
import { Hotel, SortBy } from "../../types/types";
import HotelRow from "../HotelRow/HotelRow";
import { useContext, useMemo, useState } from "react";
import { HandleOpenContext } from "../../utils/context";

const HotelSectionCards = () => {
  const hotels = useAppSelector((state) => state.hotelReducer.hotels);
  const context = useContext(HandleOpenContext);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [sortingDirection, setsortingDirection] = useState(false);
  const [filterCity, setFilterCity] = useState<string | null>(null);
  const [filterFavorite, setFilterFavorite] = useState(false);

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };
  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
    setsortingDirection(!sortingDirection);
  };
  const handleFavorite = () => {
    setFilterFavorite(!filterFavorite);
  };

  const filteredHotels = useMemo(() => {
    return filterCity != null && filterCity.length > 0
      ? hotels.filter((hotel) => {
          return hotel.city && filterFavorite
            ? hotel.city.toLowerCase().includes(filterCity.toLowerCase()) &&
                hotel.favorite
            : hotel.city
            ? hotel.city.toLowerCase().includes(filterCity.toLowerCase())
            : [];
        })
      : filterFavorite
      ? hotels.filter((hotel) => hotel.favorite)
      : hotels;
  }, [hotels, filterCity, filterFavorite]);

  const sortedHotels = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredHotels;

    const compareProperties: Record<
      string,
      (hotel: Hotel) => string | undefined
    > = {
      [SortBy.COUNTRY]: (hotel) => hotel.country,
      [SortBy.NAME]: (hotel) => hotel.name,
      [SortBy.CITY]: (hotel) => hotel.city,
    };

    return [...filteredHotels].sort((a, b) => {
      const extractProperty = compareProperties[sorting];
      const propertyA = extractProperty(a);
      const propertyB = extractProperty(b);

      return propertyA && propertyB
        ? sortingDirection
          ? propertyB.localeCompare(propertyA)
          : propertyA.localeCompare(propertyB)
        : 0;
    });
  }, [filteredHotels, sorting, sortingDirection]);

  return (
    <>
      <header className=" h-1/3  flex flex-col items-center justify-center gap-4 m-4 mb-8 ">
        <h2 className="font-bold text-2xl ">Hoteles</h2>
        <p>Ver, agregar y editar hoteles</p>
        <input
          className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Filtra por ciudad"
          onChange={(e) => {
            setFilterCity(e.target.value);
          }}
        />

        <div className="flex flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              context?.handleHotelFormOpen();
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar hotel
          </button>

          <button
            className={`${
              filterFavorite ? "bg-blue-600" : " bg-yellow-400"
            } hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={handleFavorite}
          >
            {filterFavorite ? "Ver todos los hoteles" : "Hoteles favoritos"}
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={toggleSortByCountry}
          >
            {sorting === SortBy.COUNTRY
              ? "No ordenar por país"
              : "Ordenar por país"}
          </button>
        </div>
      </header>

      <table width="100%" cellPadding="10%">
        <thead className="bg-blue-600 text-white">
          <tr className=" text-left">
            <th
              className=""
              onClick={() => {
                handleChangeSort(SortBy.NAME);
              }}
            >
              Favorito:
            </th>
            <th
              className=" cursor-pointer hover:bg-blue-500"
              onClick={() => {
                handleChangeSort(SortBy.NAME);
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
              Nombre:
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
                handleChangeSort(SortBy.COUNTRY);
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
              Pais:
            </th>
            <th>Acciones: </th>
          </tr>
        </thead>
        <tbody>
          {sortedHotels.map((hotel, i) => (
            <HotelRow key={hotel.idHotel} hotelData={hotel} index={i} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HotelSectionCards;
