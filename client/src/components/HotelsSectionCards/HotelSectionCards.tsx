import { useAppSelector } from "../../hooks/reduxHooks";
import { Hotel } from "../../types/types";
import HotelCard from "../HotelCard/HotelCard";

const HotelSectionCards = () => {
  const hotels: Hotel[] = useAppSelector((state) => state.hotelReducer.hotels);
  console.log(hotels);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.idHotel} hotelData={hotel} />
      ))}
    </section>
  );
};

export default HotelSectionCards;
