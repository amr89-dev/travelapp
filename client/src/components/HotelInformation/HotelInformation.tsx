import worldIcon from "../../assets/iconworld.svg";
import addressIcon from "../../assets/iconaddress.svg";
import cityIcon from "../../assets/iconcity.svg";
import descriptionIcon from "../../assets/iconinfo.svg";
import { hotelInformationProps } from "../../types/types";

const HotelInformation = ({ hotel }: hotelInformationProps) => {
  return (
    <section className="flex flex-col items-center border">
      <h2 className="font-bold text-xl ">Información del Hotel</h2>

      <aside className=" w-full min-h-full flex flex-col ">
        <div className="flex flex-row  items-center  ">
          <figure>
            <img src={worldIcon} alt="world" />
          </figure>
          <div className="flex flex-col items-center">
            <h3 className="font-light">Nombre</h3>
            <p className=" font-bold text-xl text-center">
              {hotel?.name ?? "name"}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center  ">
          <figure>
            <img src={addressIcon} alt="address" />
          </figure>
          <div className="flex flex-col items-center">
            <h3 className="font-light">Dirección</h3>
            <p className=" font-bold text-xl text-center">
              {hotel?.address || "address"}
            </p>
          </div>
        </div>

        <div className="flex flex-row  items-center ">
          <figure>
            <img src={cityIcon} alt="world" />
          </figure>
          <div className="flex flex-col items-center">
            <h3 className="font-light">Ciudad</h3>
            <div className="flex flex-row">
              <p className="font-bold text-xl text-center">
                {hotel?.city || "city"}, {hotel?.country || "country"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row  items-center">
          <figure>
            <img src={descriptionIcon} alt="world" />
          </figure>
          <div className="flex flex-col items-center">
            <h3 className="font-light">Descripción</h3>

            <p className=" font-bold text-xl text-center">
              {hotel?.description || "name"}
            </p>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default HotelInformation;
