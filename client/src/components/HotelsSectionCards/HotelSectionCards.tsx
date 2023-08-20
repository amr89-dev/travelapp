import { useAppSelector } from "../../hooks/reduxHooks";
import { Hotel } from "../../types/types";
import HotelRow from "../HotelRow/HotelRow";

const HotelSectionCards = () => {
  const hotels: Hotel[] = useAppSelector((state) => state.hotelReducer.hotels);

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre:</th>
          <th>Ciudad:</th>
          <th>Acciones: </th>
        </tr>
      </thead>
      <tbody>
        {hotels.map((hotel) => (
          <HotelRow key={hotel.idHotel} hotelData={hotel} />
        ))}
      </tbody>
    </table>
  );
};

export default HotelSectionCards;
