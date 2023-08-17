import { HotelCardProps } from "../../types/types";
import defaultImg from "../../assets/roomDefaultimage.svg";

const HotelCard = ({ hotelData }: HotelCardProps) => {
  const { name, city, description } = hotelData;
  return (
    <article className="flex flex-col items-center  border max-w-xs">
      <figure>
        <img src={defaultImg} alt="Hotel Image" />
      </figure>
      <h3>{name}</h3>
      <p>{city}</p>
      <p>{description}</p>
      <div>
        <button>Ver</button>
        <button>Agendar</button>
      </div>
    </article>
  );
};

export default HotelCard;
