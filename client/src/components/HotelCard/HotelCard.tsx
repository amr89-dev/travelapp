import { HotelCardProps } from "../../types/types";

const HotelCard = ({ hotelData }: HotelCardProps) => {
  const { image, name, city, country, description } = hotelData;
  return (
    <div>
      <figure>
        <img
          src={image}
          alt={name}
          className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
        />
      </figure>
      <p>{name}</p>
      <p>{`${city}, ${country}`}</p>
      <p>{description}</p>
    </div>
  );
};

export default HotelCard;
