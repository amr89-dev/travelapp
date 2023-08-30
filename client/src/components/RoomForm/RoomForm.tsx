import { useState, useContext } from "react";
import { Room } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  createRoom,
  setErrorRoom,
  setSucces,
} from "../../redux/slices/room.slice";
import { HandleOpenContext } from "../../utils/context";
import Swal from "sweetalert2";

const RoomForm = () => {
  const context = useContext(HandleOpenContext);
  const dispatch = useAppDispatch();
  const hotelName = useAppSelector((state) => state.hotelReducer.hotels)
    .filter((hotel) => hotel.idHotel === context?.roomFormOpen.id)
    .map((hotel) => hotel.name);
  const roomState = useAppSelector((state) => state.roomReducer);
  const { error, success } = roomState;

  const initialState = {
    idHotel: context?.roomFormOpen.id,
    numRooms: 0,
    roomType: "",
    roomPrice: "",
    roomLocation: "",
    available: true,
    roomTaxes: "",
    roomCapacity: 0,
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
    Swal.showLoading();
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
  if (error?.message) {
    Swal.fire({
      title: "Error!",
      text: `${error?.message}`,
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setErrorRoom(null));
      context?.handleRoomFormOpen(undefined);
    });
  } else if (success) {
    Swal.fire({
      title: "Exito!",
      text: `Las habitaciones han sido creadas correctamente`,
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setSucces(null));
      context?.handleRoomFormOpen(undefined);
    });
  }

  return (
    <article className="fixed inset-0  min-h-screen p-8   flex flex-col items-center justify-center bg-white rounded-lg border">
      <form
        className={` flex flex-col items-center justify-center w-full `}
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-gray-700  text-2xl m-4 ">
          Crea habitaciones para el hotel: <i>{hotelName[0]}</i>
        </h2>

        <div className=" shadow-2xl rounded-lg  sm:w-1/2 flex flex-col p-4 gap-3 mb-3">
          <div className="flex flex-row items-center gap-4">
            <div className="w-full">
              <label htmlFor="numRooms" className={formStyles.label}>
                Cantidad de habitaciones a crear:
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
            <div className="w-full">
              <label htmlFor="roomType" className={formStyles.label}>
                Tipo de habitación:
              </label>
              <select
                className={formStyles.input}
                name="roomType"
                id="roomType"
                onChange={handleChange}
                value={formData.roomType}
              >
                <option>Selecciona el tipo de habitación</option>
                <option value="Sencilla" selected>
                  Sencilla
                </option>
                <option value="Doble">Doble</option>
                <option value="Triple">Triple</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="roomPrice" className={formStyles.label}>
              Costo base de la habitación en dolares:
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
            <label htmlFor="roomTaxes" className={formStyles.label}>
              Impuesto de la habitación :
            </label>
            <input
              type="number"
              min={0}
              max={100}
              name="roomTaxes"
              className={formStyles.input}
              id="roomTaxes"
              onChange={handleChange}
              value={formData.roomTaxes}
              placeholder="Ingrese el impuesto de la habitación en %"
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
        <div className="flex flex-row gap-2 justify-center">
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
