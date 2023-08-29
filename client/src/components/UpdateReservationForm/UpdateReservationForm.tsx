import { useContext, useState } from "react";
import { HandleOpenContext } from "../../utils/context";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Reservation, UpdateReservationFormProps } from "../../types/types";
import {
  setError,
  setSuccess,
  updateRerservation,
} from "../../redux/slices/reservations.slice";
import Swal from "sweetalert2";

const UpdateReservationForm = ({ reservation }: UpdateReservationFormProps) => {
  const context = useContext(HandleOpenContext);
  const reservationsState = useAppSelector((state) => state.reservationReducer);
  const dispatch = useAppDispatch();
  const { error, success } = reservationsState;

  const [formData, setFormData] = useState<Reservation>({
    idReservation: reservation.idReservation,
    checkInDate: reservation.checkInDate,
    checkOutDate: reservation.checkOutDate,
    userId: reservation.userId,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateRerservation(formData));
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
      context?.handleReservationUpdateOpen(undefined);
    });
  } else if (success) {
    Swal.fire({
      title: "Exito!",
      text: `La reserva ha sido actualizada correctamente`,
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setSuccess(null));
      context?.handleReservationUpdateOpen(undefined);
    });
  }
  return (
    <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[60%]  p-8 bg-white rounded-lg border flex flex-col justify-center items-center">
      <h2 className="font-bold text-xl mb-4">Actualizar Reserva</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={formStyles.input}
          type="hidden"
          name="idRoom"
          value={formData.idReservation}
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

        <div className="flex flex-row gap-2 items-center justify-center mt-4">
          <button className={formStyles.button}>Actualizar reserva</button>
          <button
            className={formStyles.button}
            onClick={() => {
              context?.handleReservationUpdateOpen(undefined);
            }}
          >
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
};
export default UpdateReservationForm;
