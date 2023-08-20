import { useState } from "react";
import { Room, updateRoomFormProps } from "../../types/types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateRoom } from "../../redux/slices/room.slice";

const UpdateRoomForm = ({ handleOpen, room }: updateRoomFormProps) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Room>({
    idRoom: room?.idRoom,
    roomPrice: room?.roomPrice,
    roomType: room?.roomType,
    available: room?.available,
  });

  const formStyles = {
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    label: "block text-gray-700 text-sm font-bold mb-2",
    button:
      "bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      available: e.target.value === "true" ? true : false,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateRoom(formData));
  };

  return (
    <section className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%]  p-8 bg-white rounded-lg border">
      <h2 className="font-bold text-2xl">
        Actualizar Información de la Habitación
      </h2>
      <button
        className={formStyles.button}
        onClick={() => {
          handleOpen();
        }}
      >
        cerrar
      </button>
      <form className=" " onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roomPrice" className={formStyles.label}>
            Precio de la habitación:
          </label>
          <input
            type="text"
            name="roomPrice"
            className={formStyles.input}
            id="roomPrice"
            onChange={handleChange}
            value={formData.roomPrice}
            placeholder="Ingrese el precio de la habitación"
          />
        </div>

        <div>
          <label htmlFor="available" className={formStyles.label}>
            Disponibilidad:
          </label>
          <label>
            <input
              type="radio"
              name="available"
              value={"true"}
              onChange={handleChange}
              defaultChecked
            />
            disponible
          </label>
          <label>
            <input
              type="radio"
              name="available"
              value={"false"}
              onChange={handleChange}
            />
            No disponible
          </label>
        </div>

        <select
          name="roomType"
          id="roomType"
          onChange={handleChange}
          value={formData.roomType}
        >
          <option value="sigle">sencilla</option>
          <option value="double">doble</option>
          <option value="triple">triple</option>
          <option value="presidential">presidencial</option>
        </select>
        <button className={formStyles.button} type="submit">
          Actualizar
        </button>
      </form>
    </section>
  );
};

export default UpdateRoomForm;
