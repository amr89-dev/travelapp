import { HotelCardProps } from "../../types/types";
import defaultImg from "../../assets/defaulimg.svg";

const HotelCard = ({ hotelData }: HotelCardProps) => {
  const { image, name, city, country, description } = hotelData;
  return (
    <div>
      <figure>
        <img
          src={image || defaultImg}
          alt={name}
          className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
        />
      </figure>
      <p>{name}</p>
      <p>{`${city}, ${country}`}</p>
      <p>{description}</p>
      <div className="flex flex-row justify-around">
        <button>Ver</button>
        <button>Reservar</button>
      </div>
    </div>
  );
};

export default HotelCard;
