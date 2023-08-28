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
    <div className="fixed inset-0 min-h-screen  p-8 bg-white rounded-lg border flex flex-col items-center justify-center ">
      <h2 className="font-bold text-3xl mb-4">Información del hotel</h2>
      <div className="grid grid-cols-2 items-start mb-3 shadow-lg p-8">
        <HotelInformation hotel={hotel[0]} />
        <HotelRoomInformation hotel={hotel[0]} rooms={rooms} />
      </div>
      <button
        onClick={() => {
          context?.handleHotelDetailOpen(undefined);
        }}
        className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
      >
        Cerrar
      </button>
    </div>
  );
};

export default HotelDetail;
