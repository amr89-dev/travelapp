import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import Layout from "../Layout/Layout";
import UpdateHotelForm from "../UpdateHotelForm/UpdateHotelForm";
import HotelInformation from "../HotelInformation/HotelInformation";
import HotelRoomInformation from "../HotelRoomInformation/HotelRoomInformation";
import { useState } from "react";

const HotelDetail = () => {
  const [openForm, setOpenForm] = useState(false);
  const id = useParams().idHotel;
  const hotels = useAppSelector((state) => state.hotelReducer.hotels);
  const hotel = hotels.filter((el) => el.idHotel === id);

  const handleOpen = () => {
    setOpenForm(!openForm);
  };
  return (
    <Layout>
      <HotelInformation hotel={hotel[0]} />
      <HotelRoomInformation hotel={hotel[0]} />
      {openForm ? (
        <button
          onClick={() => {
            handleOpen();
          }}
        >
          Abri formulario
        </button>
      ) : (
        <UpdateHotelForm handleOpen={handleOpen} hotel={hotel[0]} />
      )}
    </Layout>
  );
};

export default HotelDetail;
