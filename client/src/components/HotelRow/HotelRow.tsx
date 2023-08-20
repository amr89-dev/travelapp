import { HotelCardProps } from "../../types/types";
import { Link } from "react-router-dom";

const HotelRow = ({ hotelData }: HotelCardProps) => {
  const { idHotel, name, city, country } = hotelData;
  return (
    <tr>
      <td>{name}</td>
      <td>{`${city}, ${country}`}</td>
      <td className="flex flex-row justify-around">
        <Link to={`/${idHotel}`}>Ver</Link>
        <button>Editar</button>
        <Link to={`/create-room/${idHotel}`}>Agregar Habitación</Link>
      </td>
    </tr>
  );
};

export default HotelRow;
