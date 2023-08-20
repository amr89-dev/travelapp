import bedIcon from "../../assets/roomDefaultimage.svg";
import chenckIcon from "../../assets/iconcheck.svg";
import { hotelInformationProps } from "../../types/types";

const HotelRoomInformation = ({hotel}: hotelInformationProps) => {
  return (
    
    <section className="grid grid-cols-2  w-full py-16 px-44 border">
      <div className="flex flex-row items-center justify-center">
        <h2 className="font-bold text-4xl leading-10">
          Información de las habitaciones
        </h2>
      </div>
      <aside className=" w-full min-h-full grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-5 items-center min-h-full py-3">
          <figure>
            <img src={chenckIcon} alt="world" />
          </figure>
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-center mb-1">
              Habitaciones disponibles
            </h3>
            <h5 className=" text-gray-600 text-sm text-center">Total</h5>
          </div>
          <p className=" font-bold text-4xl text-center">
            {hotel?.rooms?.length ?? "name"}
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center min-h-full py-3">
          <figure>
            <img src={bedIcon} alt="world" />
          </figure>
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-center mb-1">
              Habitaciones reservadas
            </h3>
            <h5 className=" text-gray-600 text-sm text-center">Total</h5>
          </div>
          <p className=" font-bold text-4xl text-center">
            {hotel?.rooms?.length ?? "name"}
          </p>
        </div>
      </aside>
    </section>
  );
};

export default HotelRoomInformation;
