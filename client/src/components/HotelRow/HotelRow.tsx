import { useContext } from "react";
import { HotelCardProps } from "../../types/types";
import { HandleOpenContext } from "../../utils/context";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateHotelFavorite } from "../../redux/slices/hotel.slice";

const HotelRow = ({ hotelData, index }: HotelCardProps) => {
  const context = useContext(HandleOpenContext);
  const dispatch = useAppDispatch();

  const { name, city, country, idHotel, favorite, available } = hotelData;
  const handleFavorite = (idHotel: string | undefined) => {
    if (favorite) {
      dispatch(updateHotelFavorite({ favorite: false, idHotel }));
    } else {
      dispatch(updateHotelFavorite({ favorite: true, idHotel }));
    }
  };

  return (
    <>
      <tr
        className={`${
          index ? (index % 2 === 0 ? "bg-white" : "bg-blue-100/disabled") : 0
        }  gap-2 group hover:bg-blue-600 hover:text-white ${
          available ? "text-gray-900" : "text-gray-400"
        }`}
      >
        <td
          onClick={() => {
            handleFavorite(idHotel);
          }}
          className="flex flex-row items-center justify-center cursor-pointer"
        >
          {favorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ECCD32"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="none"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          )}
        </td>
        <td className="">{name}</td>
        <td className="">{city}</td>
        <td className="">{country}</td>
        <td className="flex flex-row justify-start gap-2 ">
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
