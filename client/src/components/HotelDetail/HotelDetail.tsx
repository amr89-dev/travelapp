import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Layout from "../Layout/Layout";
import worldIcon from "../../assets/iconworld.svg";
import addressIcon from "../../assets/iconaddress.svg";
import cityIcon from "../../assets/iconcity.svg";
import descriptionIcon from "../../assets/iconinfo.svg";
import { gethotels } from "../../redux/hotel.slice";
import { useEffect } from "react";

const HotelDetail = () => {
  const dispatch = useAppDispatch();
  const id = useParams().idHotel;
  const hotels = useAppSelector((state) => state.hotelReducer.hotels);
  const hotel = hotels.filter((el) => el.idHotel === id);

  const { name, address, country, city } = hotel[0];
  useEffect(() => {
    dispatch(gethotels());
  }, []);

  return (
    <Layout>
      <section className="w-[90%] h-96 flex flex-col items-center py-16 px-44 gap-3">
        <h2 className="font-bold text-2xl">Información del Hotel</h2>
        <aside className=" w-full min-h-full grid grid-cols-4 gap-5">
          <div className="flex flex-col gap-5 items-center min-h-full py-3">
            <figure>
              <img src={worldIcon} alt="world" />
            </figure>
            <div className="flex flex-col items-center">
              <h3 className="font-bold">Nombre</h3>
              <h5 className=" text-gray-600 text-sm"> Hotel</h5>
            </div>
            <p className=" font-bold text-xl text-center">{name}</p>
          </div>

          <div className="flex flex-col gap-5 items-center min-h-full py-3">
            <figure>
              <img src={addressIcon} alt="address" />
            </figure>
            <div className="flex flex-col items-center">
              <h3 className="font-bold">Dirección</h3>
              <h5 className=" text-gray-600 text-sm">Urbano</h5>
            </div>
            <p className=" font-bold text-xl text-center">{address}</p>
          </div>
          <div className="flex flex-col gap-5 items-center min-h-full py-3">
            <figure>
              <img src={cityIcon} alt="world" />
            </figure>
            <div className="flex flex-col items-center">
              <h3 className="font-bold">Ciudad</h3>
              <h5 className=" text-gray-600 text-sm"> {city}</h5>
            </div>
            <p className=" font-bold text-xl text-center">{country}</p>
          </div>
          <div className="flex flex-col gap-5 items-center min-h-full py-3">
            <figure>
              <img src={descriptionIcon} alt="world" />
            </figure>
            <div className="flex flex-col items-center">
              <h3 className="font-bold">Descripción</h3>
              <h5 className=" text-gray-600 text-sm"> {country}</h5>
            </div>
            <p className=" font-bold text-xl text-center">{name}</p>
          </div>
        </aside>
      </section>
    </Layout>
  );
};

export default HotelDetail;