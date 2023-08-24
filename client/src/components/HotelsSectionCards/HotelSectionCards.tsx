import { useAppSelector } from "../../hooks/reduxHooks";
import { Hotel } from "../../types/types";
import HotelRow from "../HotelRow/HotelRow";
import { useContext } from "react";
import { HandleOpenContext } from "../../utils/context";

const HotelSectionCards = () => {
  const hotels: Hotel[] = useAppSelector((state) => state.hotelReducer.hotels);
  const context = useContext(HandleOpenContext);

  return (
    <>
      <header className="w-full h-1/3  flex flex-col items-center justify-center gap-4 mt-4 shadow-sm">
        <h2 className="font-bold text-xl ">Hoteles</h2>
        <p>Ver, agregar y editar hoteles</p>
        <input type="search" name="" id="" className="border rounded-md p-1" />
        <div className="flex flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              context?.handleHotelFormOpen();
            }}
            className="bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-1 px-2 border border-black hover:border-transparent rounded"
          >
            Agregar hotel
          </button>

          <button className="bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-1 px-2 border border-black hover:border-transparent rounded">
            Hoteles favoritos
          </button>
        </div>
      </header>

      <main className="py-4 px-8">
        <table className="">
          <thead className="bg-red-500 w-full">
            <tr>
              <th>Nombre:</th>
              <th>Ciudad:</th>
              <th>Acciones: </th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <HotelRow key={hotel.idHotel} hotelData={hotel} />
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default HotelSectionCards;
