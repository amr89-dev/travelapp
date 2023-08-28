import worldIcon from "../../assets/iconworld.svg";
import addressIcon from "../../assets/iconaddress.svg";
import cityIcon from "../../assets/iconcity.svg";
import descriptionIcon from "../../assets/iconinfo.svg";
import { hotelInformationProps } from "../../types/types";

const HotelInformation = ({ hotel }: hotelInformationProps) => {
  return (
    <section className="flex flex-col items-center p-2 ">
      <aside className=" w-full min-h-full flex flex-col gap-3 ">
        <div className="flex flex-row  items-center  ">
          <figure>
            <img className="max-w-[48px] mr-4" src={worldIcon} alt="world" />
          </figure>
          <div className="flex flex-col items-start w-full">
            <h3 className="font-light">Nombre</h3>
            <p className=" font-bold text-xl">{hotel?.name ?? "name"}</p>
          </div>
        </div>

        <div className="flex flex-row items-center  ">
          <figure>
            <img
              className="max-w-[48px] mr-4"
              src={addressIcon}
              alt="address"
            />
          </figure>
          <div className="flex flex-col items-start w-full">
            <h3 className="font-light">Dirección</h3>
            <p className=" font-bold text-xl">{hotel?.address || "address"}</p>
          </div>
        </div>

        <div className="flex flex-row  items-center ">
          <figure>
            <img className="max-w-[48px] mr-4" src={cityIcon} alt="world" />
          </figure>
          <div className="flex flex-col items-start w-full">
            <h3 className="font-light">Ciudad</h3>
            <div className="flex flex-row">
              <p className="font-bold text-xl">
                {hotel?.city || "city"}, {hotel?.country || "country"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row  items-center">
          <figure>
            <img
              className="max-w-[48px] mr-4"
              src={descriptionIcon}
              alt="world"
            />
          </figure>
          <div className="flex flex-col items-start w-full">
            <h3 className="font-light">Descripción</h3>
            <div className="flex flex-row">
              <p className="font-bold text-xl">
                {hotel.description || "description"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default HotelInformation;
