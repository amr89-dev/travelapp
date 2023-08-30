import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  createReservation,
  setError,
  setSuccess,
} from "../../redux/slices/reservations.slice";
import { useNavigate, useParams } from "react-router-dom";
import { Guest, Reservation, UserGender } from "../../types/types";
import GuestForm from "../GuestForm/GuestForm";
import Swal from "sweetalert2";

const ReservationUserForm = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<Guest[]>([]);
  const dispatch = useAppDispatch();
  const idRoom = useParams().id;
  const roomData = useAppSelector((state) => state.roomReducer.rooms).filter(
    (room) => room.idRoom === idRoom
  );
  const reservationsState = useAppSelector((state) => state.reservationReducer);

  const { error, success } = reservationsState;

  const { roomCapacity } = roomData[0];
  const numOfGuest = Array.from(" ".repeat(roomCapacity));

  const [guestData, setGuestData] = useState<Guest>({
    email: "",
    name: "",
    lastName: "",
    birthdate: "",
    gender: UserGender.NEUTER,
    documentType: "",
    documentNumber: "",
    phone: "",
  });

  const handleGuestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setGuestData({
      ...guestData,
      [e.target.name]: e.target.value,
    });
  };

  const addGuest = () => {
    setGuests([...guests, guestData]);
    setGuestData({
      email: "",
      name: "",
      lastName: "",
      birthdate: "",
      gender: UserGender.NEUTER,
      documentType: "",
      documentNumber: "",
      phone: "",
    });
  };

  const initialState = {
    checkInDate: "",
    checkOutDate: "",
    userId: "",
    idRoom: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    guests: [],
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
      guests: guests,
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
    });
  } else if (success) {
    Swal.fire({
      title: "Exito!",
      text: `La reserva ha sido creada correctamente, por favor revise su correo electronico`,
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setSuccess(null));
    });
  }
  return (
    <div className="p-8 pt-4 rounded-lg border flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-between w-[55%] ">
        <button
          className="self-start  bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            navigate(-1);
          }}
        >
          Regresar
        </button>
        <h2 className="font-bold text-xl  self-center text-center">
          Hacer una reserva
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="w-[60%] flex flex-col">
        <input type="hidden" name="idRoom" value={formData.idRoom} />
        {numOfGuest.map((_, i, arr) => {
          return (
            <GuestForm
              index={i}
              array={arr}
              key={i}
              guestData={guestData}
              handleGuestChange={handleGuestChange}
              addGuest={addGuest}
            />
          );
        })}
        <h3 className="font-bold text-gray-700 self-start text-l  my-4 px-8">
          Datos de la reserva
        </h3>
        <div className="w-full flex flex-row items-center justify-center gap-3 mb-2 px-8">
          <div className="w-full">
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

          <div className="w-full">
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
              min={
                formData.checkInDate || new Date().toISOString().split("T")[0]
              }
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center gap-3 mb-4 px-8">
          <div className="w-full">
            <label className={formStyles.label} htmlFor="emergencyContactName">
              Nombre contacto de emergencia:
            </label>
            <input
              className={formStyles.input}
              type="text"
              id="emergencyContactName"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              placeholder="Ingrese nombre y apellido"
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className={formStyles.label} htmlFor="emergencyContactPhone">
              Número contacto de emergencia:
            </label>
            <input
              className={formStyles.input}
              type="text"
              id="emergencyContactPhone"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              placeholder="Ingrese numero telefonico con codigo de pais"
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className={`${formStyles.button}  mx-8`}>
          Reservar
        </button>
      </form>
    </div>
  );
};

export default ReservationUserForm;
