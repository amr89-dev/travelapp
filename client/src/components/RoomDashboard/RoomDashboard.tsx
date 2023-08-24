import { useContext } from "react";
import RoomSectionCards from "../RoomsSectionCards/RoomSectionCards";
import { HandleOpenContext } from "../../utils/context";
import UpdateRoomForm from "../UpdateRoomForm/UpdateRoomForm";
import { useAppSelector } from "../../hooks/reduxHooks";
import ReservationForm from "../ReservationForm/ReservationForm";

const RoomDashboard = () => {
  const context = useContext(HandleOpenContext);
  const room = useAppSelector((state) => state.roomReducer.rooms).filter(
    (room) => room.idRoom === context?.roomUpdateOpen.id
  );

  return (
    <div>
      <RoomSectionCards />
      {context?.roomUpdateOpen.isOpen && <UpdateRoomForm room={room[0]} />}
      {context?.reservationFormOpen.isOpen && <ReservationForm />}
    </div>
  );
};

export default RoomDashboard;
