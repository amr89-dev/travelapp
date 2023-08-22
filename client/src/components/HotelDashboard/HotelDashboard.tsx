import HotelForm from "../HotelForm/HotelForm";
import HotelSectionHeader from "../HotelSectionHeader/HotelSectionHeader";
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
    <div className="flex flex-col">
      <HotelSectionHeader />
      <HotelSectionCards />
      {context?.hotelFormOpen && <HotelForm />}
      {context?.hotelUpdateOpen.isOpen && <UpdateHotelForm hotel={hotel[0]} />}
      {context?.roomFormOpen.isOpen && <RoomForm />}
      {context?.hotelDetailOpen.isOpen && <HotelDetail />}
    </div>
  );
};

export default HotelDashboard;
