import { useContext } from "react";
import { HotelCardProps } from "../../types/types";
import { HandleOpenContext } from "../../utils/context";

const HotelRow = ({ hotelData }: HotelCardProps) => {
  const context = useContext(HandleOpenContext);

  const { name, city, country, idHotel } = hotelData;
  const styles = {
    button: "border rounded-lg ",
  };
  return (
    <>
      <tr className="rounded-lg hover:bg-blue-300 hover:text-white ">
        <td className="rounded-lg">{name}</td>
        <td className="rounded-lg">{`${city}, ${country}`}</td>
        <td className="grid grid-cols-3 gap-2 ">
          <button
            className={styles.button}
            onClick={() => {
              context?.handleHotelDetailOpen(idHotel);
            }}
          >
            Ver
          </button>
          <button
            className={styles.button}
            onClick={() => {
              context?.handleHotelUpdateOpen(idHotel);
            }}
          >
            Editar
          </button>
          <button
            className={styles.button}
            onClick={() => {
              context?.handleRoomFormOpen(idHotel);
            }}
          >
            Agregar Habitación
          </button>
        </td>
      </tr>
    </>
  );
};

export default HotelRow;
