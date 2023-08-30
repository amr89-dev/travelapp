import bedIcon from "../../assets/roomDefaultimage.svg";
import chenckIcon from "../../assets/iconcheck.svg";
import { hotelInformationProps } from "../../types/types";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useContext } from "react";
import { HandleOpenContext } from "../../utils/context";

const HotelRoomInformation = ({ rooms }: hotelInformationProps) => {
  const reservations = useAppSelector(
    (state) => state.reservationReducer.reservations
  );
  const context = useContext(HandleOpenContext);

  const totalReservations = reservations.filter(
    (el) => el.room?.hotelId === context?.hotelDetailOpen.id
  );

  return (
    <section className="flex flex-col items-center ">
      <aside className=" w-full min-h-full grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-5 items-center min-h-full py-3">
          <figure>
            <img src={chenckIcon} alt="world" className="max-w-[48px]" />
          </figure>
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-center mb-1">
              Habitaciones disponibles
            </h3>
            <h5 className=" text-gray-600 text-sm text-center">Total</h5>
          </div>
          <p className=" font-bold text-4xl text-center">
            {rooms?.length ?? "# de habitaciones"}
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center min-h-full py-3">
          <figure>
            <img src={bedIcon} alt="world" className="max-w-[48px]" />
          </figure>
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-center mb-1">
              Reservas en este hotel
            </h3>
            <h5 className=" text-gray-600 text-sm text-center">Total</h5>
          </div>
          <p className=" font-bold text-4xl text-center">
            {totalReservations?.length ?? "name"}
          </p>
        </div>
      </aside>
    </section>
  );
};

export default HotelRoomInformation;
