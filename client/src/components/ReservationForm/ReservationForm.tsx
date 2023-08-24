import { useContext } from "react";
import { HandleOpenContext } from "../../utils/context";
import { useAppSelector } from "../../hooks/reduxHooks";

const ReservationForm = () => {
  const context = useContext(HandleOpenContext);
  const idRoom = context?.reservationFormOpen.id;
  const users = useAppSelector((state) => state.userReducer.users);

  console.log(users);

  const formStyles = {
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    label: "block text-gray-700 text-sm font-bold mb-2",
    button:
      "bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
  };

  return (
    <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%]  p-8 bg-white rounded-lg border flex flex-col justify-center items-center">
      <form>
        <input
          className={formStyles.input}
          type="hidden"
          name="idRoom"
          value={idRoom}
        />
        <label className={formStyles.label} htmlFor="checkInDate">
          Fecha de llegada:
        </label>
        <input
          className={formStyles.input}
          type="date"
          id="checkInDate"
          name="checkInDate"
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
          required
        />
        <select name="users" id="users">
          <option disabled>Asignar a un usuario</option>
          {users.map((el) => (
            <option key={el.email}>{`${el.name} ${el.lastName}`}</option>
          ))}
        </select>

        <button className={formStyles.button}>Reservar</button>
        <button
          className={formStyles.button}
          onClick={() => {
            context?.handleReservationFormOpen(undefined);
          }}
        >
          Cerrar
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
