import { HotelCardProps } from "../../types/types";
import defaultImg from "../../assets/🏩hotel (1).svg";
import { Link } from "react-router-dom";

const HotelCard = ({ hotelData }: HotelCardProps) => {
  const { idHotel, name, city, description } = hotelData;
  return (
    <article className="flex flex-col items-center  border max-w-xs">
      <figure>
        <img src={defaultImg} alt="Hotel Image" className="w-10" />
      </figure>
      <h3>{name}</h3>
      <p>{city}</p>
      <p>{description}</p>
      <div>
        <Link to={`/hotel/${idHotel}`}>Ver</Link>
        <button>Agendar</button>
      </div>
    </article>
  );
};

export default HotelCard;
