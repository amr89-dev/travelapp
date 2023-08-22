import { useState, useContext } from "react";
import { Room } from "../../types/types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { createRoom } from "../../redux/slices/room.slice";
import { HandleOpenContext } from "../../utils/context";

const RoomForm = () => {
  const dispatch = useAppDispatch();
  const context = useContext(HandleOpenContext);

  const initialState = {
    idHotel: context?.roomFormOpen.id,
    numRooms: 0,
    roomType: "",
    roomPrice: "",
    roomLocation: "",
    available: true,
  };

  const [formData, setFormData] = useState<Room>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createRoom(formData));
    setFormData(initialState);
  };
  const formStyles = {
    modal: "absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2",
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    label: "block text-gray-700 text-sm font-bold mb-2",
    button:
      "bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
    textArea:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ",
  };

  return (
    <article className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] min-h-screen  p-8 bg-white rounded-lg border">
      <form
        className={` flex flex-col items-center justify-center `}
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-gray-700  text-2xl m-4 ">
          Crea habitaciones para este hotel
        </h2>

        <div className=" shadow-2xl rounded-lg   sm:w-1/2 flex flex-col p-4 gap-3">
          <div>
            <label htmlFor="numRooms" className={formStyles.label}>
              Cantidad de habitaciones
            </label>
            <input
              type="number"
              name="numRooms"
              className={formStyles.input}
              id="numRooms"
              onChange={handleChange}
              value={formData.numRooms}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="roomType" className={formStyles.label}>
              Tipo de habitación:
            </label>
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
          </div>
          <div>
            <label htmlFor="roomPrice" className={formStyles.label}>
              Costo de la habitaacion:
            </label>
            <input
              type="text"
              name="roomPrice"
              className={formStyles.input}
              id="roomPrice"
              onChange={handleChange}
              value={formData.roomPrice}
              placeholder="Ingrese el costo de la habitación"
            />
          </div>
          <div>
            <label htmlFor="roomLocation" className={formStyles.label}>
              Ubicación de la habitación:
            </label>
            <input
              type="text"
              name="roomLocation"
              className={formStyles.input}
              id="roomLocation"
              onChange={handleChange}
              value={formData.roomLocation}
              placeholder="Ingrese la ubicación de la habitación"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <button className={formStyles.button} type="submit">
            Registrar
          </button>
          <button
            className={formStyles.button}
            onClick={() => {
              context?.handleRoomFormOpen(undefined);
            }}
          >
            Cerrar
          </button>
        </div>
      </form>
    </article>
  );
};

export default RoomForm;
