import { useState } from "react";
import { Reservation } from "../../types/types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { createReservation } from "../../redux/slices/reservations.slice";

type Props = {
  handleOpenForm: () => void;
  idRoom: string;
};

const ReservationUserForm = ({ handleOpenForm, idRoom }: Props) => {
  const dispatch = useAppDispatch();
  const initialState = {
    idRoom: "",
    checkInDate: "",
    checkOutDate: "",
    userId: "",
  };
  const storage = localStorage.getItem("userLogged") || "";
  const { userDetails } = JSON.parse(storage);

  const [formData, setFormData] = useState<Reservation>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      idRoom: idRoom || "",
      userId: userDetails.id || "",
    });
  };
  console.log(formData);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createReservation(formData));
    setFormData(initialState);
  };
  const formStyles = {
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    label: "block text-gray-700 text-sm font-bold mb-2",
    button:
      "bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
  };
  return (
    <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%]  p-8 bg-white rounded-lg border flex flex-col justify-center items-center">
      <h2 className="font-bold text-xl">Hacer una reserva</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={formStyles.input}
          type="hidden"
          name="idRoom"
          value={formData.idRoom}
        />
        <label className={formStyles.label} htmlFor="checkInDate">
          Fecha de llegada:
        </label>
        <input
          className={formStyles.input}
          type="date"
          id="checkInDate"
          name="checkInDate"
          onChange={handleChange}
          value={formData.checkInDate}
          min={new Date().toISOString().split("T")[0]}
          max={formData.checkOutDate}
          required
        />
        <label className={formStyles.label} htmlFor="checkOutDate">
          Fecha de salida:
        </label>
        <input
          className={formStyles.input}
          type="date"
          id="checkOutDate"
          name="checkOutDate"
          onChange={handleChange}
          value={formData.checkOutDate}
          min={formData.checkInDate || new Date().toISOString().split("T")[0]}
          required
        />

        <button className={formStyles.button}>Reservar</button>
        <button
          className={formStyles.button}
          onClick={() => {
            handleOpenForm();
          }}
        >
          Cerrar
        </button>
      </form>
    </div>
  );
};

export default ReservationUserForm;
