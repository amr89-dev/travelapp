import { useContext } from "react";
import { HotelCardProps } from "../../types/types";
import { HandleOpenContext } from "../../utils/context";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateHotel } from "../../redux/slices/hotel.slice";

const HotelRow = ({ hotelData, index }: HotelCardProps) => {
  const context = useContext(HandleOpenContext);
  const dispatch = useAppDispatch();

  const { name, city, country, idHotel, favorite } = hotelData;
  const handleFavorite = (idHotel: string | undefined) => {
    if (favorite) {
      dispatch(updateHotel({ favorite: false, idHotel }));
    } else {
      dispatch(updateHotel({ favorite: true, idHotel }));
    }
  };

  return (
    <>
      <tr
        className={`${
          index ? (index % 2 === 0 ? "bg-white" : "bg-gray-100") : 0
        } text-gray-900 gap-2 group hover:bg-blue-600 hover:text-white `}
      >
        <td
          onClick={() => {
            handleFavorite(idHotel);
          }}
        >
          {favorite ? "favorito" : "no"}
        </td>
        <td className="">{name}</td>
        <td className="">{city}</td>
        <td className="">{country}</td>
        <td className="grid grid-cols-3 gap-2 ">
          <button
            className="border border-black group-hover:border-white rounded-lg p-1"
            onClick={() => {
              context?.handleHotelDetailOpen(idHotel);
            }}
          >
            Ver
          </button>
          <button
            className="border border-black group-hover:border-white rounded-lg p-1"
            onClick={() => {
              context?.handleHotelUpdateOpen(idHotel);
            }}
          >
            Editar
          </button>
          <button
            className="border border-black group-hover:border-white rounded-lg p-1"
            onClick={() => {
              context?.handleRoomFormOpen(idHotel);
            }}
          >
            Agregar Habitación
          </button>
        </td>
      </tr>
    </>
  );
};

export default HotelRow;
