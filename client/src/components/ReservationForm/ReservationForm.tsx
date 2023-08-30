import { useContext, useState } from "react";
import { HandleOpenContext } from "../../utils/context";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Reservation } from "../../types/types";
import {
  createReservation,
  setError,
  setSuccess,
} from "../../redux/slices/reservations.slice";
import Swal from "sweetalert2";

const ReservationForm = () => {
  const context = useContext(HandleOpenContext);
  const idRoom = context?.reservationFormOpen.id;
  const users = useAppSelector((state) => state.userReducer.users);
  const reservationsState = useAppSelector((state) => state.reservationReducer);
  const dispatch = useAppDispatch();
  const { error, success } = reservationsState;
  const initialState = {
    idReservation: "",
    checkInDate: "",
    checkOutDate: "",
    userId: "",
  };

  const [formData, setFormData] = useState<Reservation>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      idRoom: idRoom || "",
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.showLoading();
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
  if (error?.message) {
    Swal.fire({
      title: "Error!",
      text: `${error?.message}`,
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setError(null));
      context?.handleReservationFormOpen(undefined);
    });
  } else if (success) {
    Swal.fire({
      title: "Exito!",
      text: `La reserva ha sido creada correctamente`,
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setSuccess(null));
      context?.handleReservationFormOpen(undefined);
    });
  }
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
        <div>
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
        </div>
        <div>
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
        </div>
        <div className="mb-4">
          <label htmlFor="users">Asignar a un usuario</label>
          <input
            className={formStyles.input}
            type="text"
            list="users"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
          <datalist id="users" className={formStyles.input}>
            <option disabled>Asignar a un usuario</option>
            {users.map((el) => (
              <option
                key={el.email}
                value={el.id}
              >{`${el.name} ${el.lastName}`}</option>
            ))}
          </datalist>
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <button className={formStyles.button}>Reservar</button>
          <button
            className={formStyles.button}
            onClick={() => {
              context?.handleReservationFormOpen(undefined);
            }}
          >
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
