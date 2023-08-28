import HotelForm from "../HotelForm/HotelForm";
import HotelSectionCards from "../HotelsSectionCards/HotelSectionCards";
import { useContext } from "react";
import UpdateHotelForm from "../UpdateHotelForm/UpdateHotelForm";
import { HandleOpenContext } from "../../utils/context";
import RoomForm from "../RoomForm/RoomForm";
import { useAppSelector } from "../../hooks/reduxHooks";
import HotelDetail from "../HotelDetail/HotelDetail";

const HotelDashboard = () => {
  const context = useContext(HandleOpenContext);
  const hotel = useAppSelector((state) => state.hotelReducer.hotels).filter(
    (el) => el.idHotel === context?.hotelUpdateOpen.id
  );

  return (
    <div className="flex flex-col w-full">
      <HotelSectionCards />
      {context?.hotelFormOpen && <HotelForm />}
      {context?.hotelUpdateOpen.isOpen && <UpdateHotelForm hotel={hotel[0]} />}
      {context?.hotelDetailOpen.isOpen && <HotelDetail />}
      {context?.roomFormOpen.isOpen && <RoomForm />}
    </div>
  );
};

export default HotelDashboard;
