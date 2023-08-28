import { HotelCardProps } from "../../types/types";
import defaultImg from "../../assets/defaulimg.svg";
import { Link } from "react-router-dom";

const HotelCard = ({ hotelData }: HotelCardProps) => {
  const { idHotel, image, name, city, country, description } = hotelData;
  return (
    <div>
      <figure>
        <img
          src={image || defaultImg}
          alt={name}
          className="max-h-[300px] md:max-h-[200px] lg:max-h-[171px] w-full object-cover rounded-xl"
        />
      </figure>
      <p>{name}</p>
      <p>{`${city}, ${country}`}</p>
      <p>{description}</p>
      <div className="flex flex-row justify-around">
        <Link to={`/availableRooms/${idHotel}`}>Ver habitaciones</Link>
      </div>
    </div>
  );
};

export default HotelCard;
