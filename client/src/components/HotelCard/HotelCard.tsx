import { HotelCardProps } from "../../types/types";
import defaultImg from "../../assets/defaulimg.svg";
import { Link } from "react-router-dom";

const HotelCard = ({ hotelData }: HotelCardProps) => {
  const { idHotel, image, name, city, country, description } = hotelData;
  return (
    <div className="shadow-lg rounded-xl">
      <figure>
        <img
          src={image || defaultImg}
          alt={name}
          className="max-h-[300px] md:max-h-[200px] lg:max-h-[171px] w-full object-cover rounded-t-xl"
        />
      </figure>
      <div className="py-3 px-2 rounded-lg">
        <p className="text-sm">{`${city}, ${country}`}</p>
        <p className="font-bold text-lg">{name}</p>
        <p className="text-md">{description}</p>
        <div className="flex flex-row justify-around my-2">
          <Link
            to={`/availableRooms/${idHotel}`}
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ver habitaciones
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
