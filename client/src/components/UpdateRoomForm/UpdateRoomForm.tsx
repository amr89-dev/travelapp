import { useState, useContext } from "react";
import { Room, updateRoomFormProps } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  setErrorRoom,
  setSucces,
  updateRoom,
} from "../../redux/slices/room.slice";
import { HandleOpenContext } from "../../utils/context";
import Swal from "sweetalert2";

const UpdateRoomForm = ({ room }: updateRoomFormProps) => {
  const dispatch = useAppDispatch();
  const context = useContext(HandleOpenContext);
  const roomsState = useAppSelector((state) => state.roomReducer);
  const { error, success } = roomsState;

  const [formData, setFormData] = useState<Room>({
    idRoom: room?.idRoom,
    roomPrice: room?.roomPrice,
    roomType: room?.roomType,
    available: room?.available,
    roomTaxes: room?.roomTaxes,
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
  if (error?.message) {
    Swal.fire({
      title: "Error!",
      text: `${error?.message}`,
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setErrorRoom(null));
      context?.handleRoomUpdateOpen(undefined);
    });
  } else if (success) {
    Swal.fire({
      title: "Exito!",
      text: `La habitación ha sido actualizada exitosamente`,
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setSucces(null));
      context?.handleRoomUpdateOpen(undefined);
    });
  }
  return (
    <section className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%]  p-8 bg-white rounded-lg border flex flex-col justify-center items-center">
      <h2 className="font-bold text-2xl mb-4">
        Actualizar Información de la Habitación
      </h2>

      <form className=" " onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roomType" className={formStyles.label}>
            Tipo de habitación:
          </label>
          <select
            name="roomType"
            id="roomType"
            onChange={handleChange}
            value={formData.roomType}
            className={formStyles.input}
          >
            <option disabled>Selecciona el tipo de habitación</option>
            <option value="Sencilla">Sencilla</option>
            <option value="Doble">Doble</option>
            <option value="Triple">Triple</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
        <div className="flex flex-row gap-4 mb-2">
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
            <label htmlFor="roomTaxes" className={formStyles.label}>
              Impuesto de la habitación:
            </label>
            <input
              type="text"
              name="roomTaxes"
              className={formStyles.input}
              id="roomTaxes"
              onChange={handleChange}
              value={formData.roomTaxes}
              placeholder="Ingrese el precio de la habitación"
            />
          </div>
        </div>

        <div className="flex flex-col w-[30%] mb-2">
          <label htmlFor="available" className={formStyles.label}>
            Disponibilidad:
          </label>
          <label>
            <input
              type="radio"
              name="available"
              value={"true"}
              onChange={handleChange}
              className="mr-3"
              checked={formData.available}
            />
            Disponible
          </label>
          <label>
            <input
              type="radio"
              name="available"
              value={"false"}
              onChange={handleChange}
              className="mr-3"
              checked={!formData.available}
            />
            No disponible
          </label>
        </div>

        <div className="flex flex-row gap-2 justify-center">
          <button className={formStyles.button} type="submit">
            Actualizar
          </button>
          <button
            className={formStyles.button}
            onClick={() => {
              context?.handleRoomUpdateOpen(undefined);
            }}
          >
            cerrar
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateRoomForm;
