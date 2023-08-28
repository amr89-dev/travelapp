import { useState } from "react";
import { InputSearch } from "../../types/types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { gethotelsByParameter } from "../../redux/slices/hotel.slice";

const SearchBar = () => {
  const [inputSearch, setinputSearch] = useState<InputSearch>({
    city: "",
    checkInDate: "",
    checkOutDate: "",
    qty: "",
  });
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinputSearch({
      ...inputSearch,
      [name]: value,
    });
  };
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(gethotelsByParameter(inputSearch));
    setinputSearch({
      city: "",
      checkInDate: "",
      checkOutDate: "",
      qty: "",
    });
  };

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
        value={inputSearch.city}
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
            inputSearch.checkInDate ? "text-gray-700" : "text-gray-400"
          } `}
        >
          {inputSearch.checkInDate.split("-").reverse().join("-") ||
            "Fecha Llegada"}
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
            inputSearch.checkOutDate ? "text-gray-700" : "text-gray-400"
          } `}
        >
          {inputSearch.checkOutDate.split("-").reverse().join("-") ||
            "Fecha Salida"}
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
        value={inputSearch.qty}
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
