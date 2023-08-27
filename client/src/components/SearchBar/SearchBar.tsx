import { useState } from "react";
import { SearchBarProps } from "../../types/types";

const SearchBar = ({
  handleSearch,
  inputSearch,
  handleOnSubmit,
}: SearchBarProps) => {
  const { checkInDate, checkOutDate } = inputSearch;

  const [openCalendar, setOpenCalendar] = useState({
    entrada: false,
    salida: false,
  });

  const handleOpenCalendar = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.currentTarget.id === "checkIn") {
      setOpenCalendar({
        ...openCalendar,
        entrada: !openCalendar.entrada,
      });
    }
    if (e.currentTarget.id === "checkOut") {
      setOpenCalendar({
        ...openCalendar,
        salida: !openCalendar.salida,
      });
    }
  };

  const handleBlurCalendar = () => {
    console.log("estoy en blur");

    setOpenCalendar({
      ...openCalendar,
      entrada: false,
      salida: false,
    });
  };

  return (
    <form
      className="w-full  grid grid-cols-12 gap-4 p-4"
      onSubmit={handleOnSubmit}
    >
      <input
        className=" col-span-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="search"
        placeholder="Busca un destino"
        name="city"
        onChange={handleSearch}
      />
      <div className="relative col-span-2">
        <button
          id="checkIn"
          onClick={(e) => {
            e.preventDefault();
            handleOpenCalendar(e);
          }}
          className={`py-3 px-3 w-full  shadow appearance-none border rounded  leading-tight focus:outline-none focus:shadow-outline ${
            checkInDate ? "text-gray-700" : "text-gray-400"
          } `}
        >
          {checkInDate.split("-").reverse().join("-") || "Fecha Llegada"}
        </button>
        {openCalendar.entrada && (
          <input
            className=" absolute top-11 left-0 shadow appearance-none border rounded py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="checkInDate"
            onChange={handleSearch}
            min={new Date().toISOString().split("T")[0]}
            onBlur={handleBlurCalendar}
            autoFocus
          />
        )}
      </div>
      <div className="relative col-span-2">
        <button
          id="checkOut"
          onClick={(e) => {
            e.preventDefault();
            handleOpenCalendar(e);
          }}
          className={`py-3 px-3 w-full  shadow appearance-none border rounded  leading-tight focus:outline-none focus:shadow-outline ${
            checkOutDate ? "text-gray-700" : "text-gray-400"
          } `}
        >
          {checkOutDate.split("-").reverse().join("-") || "Fecha Salida"}
        </button>
        {openCalendar.salida && (
          <input
            className="absolute top-11 left-0  shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="checkOutDate"
            onChange={handleSearch}
            min={new Date().toISOString().split("T")[0]}
            onBlur={handleBlurCalendar}
            autoFocus
          />
        )}
      </div>

      <input
        className=" col-span-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        name="qty"
        id="passagers"
        placeholder="Cantidad de huespedes"
        onChange={handleSearch}
      />

      <button
        type="submit"
        className=" col-span-1 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
