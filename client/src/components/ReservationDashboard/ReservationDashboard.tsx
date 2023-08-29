import { useContext } from "react";
import ReservationSectionList from "../ReservationSectionList/ReservationSectionList";
import { HandleOpenContext } from "../../utils/context";
import UpdateReservationForm from "../UpdateReservationForm/UpdateReservationForm";
import { useAppSelector } from "../../hooks/reduxHooks";
import ReservationDetail from "../ReservationDetail/ReservationDetail";

const ReservationDashboard = () => {
  const context = useContext(HandleOpenContext);
  const reservation = useAppSelector(
    (state) => state.reservationReducer.reservations
  ).filter(
    (reservation) =>
      reservation.idReservation === context?.reservationUpdateOpen.id
  );
  return (
    <div className="flex flex-col w-full">
      <ReservationSectionList />
      {context?.reservationUpdateOpen.isOpen && (
        <UpdateReservationForm reservation={reservation[0]} />
      )}
      {context?.reservationDetailOpen.isOpen && <ReservationDetail />}
    </div>
  );
};

export default ReservationDashboard;
