import { useAppSelector } from "../../hooks/reduxHooks";
import HotelInformation from "../HotelInformation/HotelInformation";
import HotelRoomInformation from "../HotelRoomInformation/HotelRoomInformation";
import { useContext } from "react";
import { HandleOpenContext } from "../../utils/context";

const HotelDetail = () => {
  const context = useContext(HandleOpenContext);
  const hotel = useAppSelector((state) => state.hotelReducer.hotels).filter(
    (el) => el.idHotel === context?.hotelDetailOpen.id
  );
  const rooms = useAppSelector((state) => state.roomReducer.rooms).filter(
    (el) => el.hotelId === context?.hotelDetailOpen.id
  );

  return (
    <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100%] h-max  p-8 bg-white rounded-lg border  ">
      <button
        onClick={() => {
          context?.handleHotelDetailOpen(undefined);
        }}
        className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
      >
        Cerrar
      </button>
      <div className="grid grid-cols-2 items-start">
        <HotelInformation hotel={hotel[0]} />
        <HotelRoomInformation hotel={hotel[0]} rooms={rooms} />
      </div>
    </div>
  );
};

export default HotelDetail;
