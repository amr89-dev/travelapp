import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { createReservation } from "../../redux/slices/reservations.slice";
import { useParams } from "react-router-dom";
import { Guest, Reservation, UserGender } from "../../types/types";
import GuestForm from "../GuestForm/GuestForm";

const ReservationUserForm = () => {
  const [guests, setGuests] = useState<Guest[]>([]);

  const dispatch = useAppDispatch();
  const idRoom = useParams().id;
  const roomData = useAppSelector((state) => state.roomReducer.rooms).filter(
    (room) => room.idRoom === idRoom
  );

  const { roomCapacity } = roomData[0];
  console.log(roomCapacity);

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
  };

  const initialState = {
    checkInDate: "",
    checkOutDate: "",
    userId: "",
    idRoom: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
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
    <div className=" bg-red-500  p-8 rounded-lg border flex flex-col justify-center items-center">
      <h2 className="font-bold text-xl">Hacer una reserva</h2>
      <form onSubmit={handleSubmit} className="w-[60%] bg-blue-500 ">
        <input type="hidden" name="idRoom" value={formData.idRoom} />
        <GuestForm
          guestData={guestData}
          handleGuestChange={handleGuestChange}
          addGuest={addGuest}
        />
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
        <div className="w-full flex flex-row items-center justify-center gap-3 mb-2 px-8">
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
        <button className={formStyles.button}>Reservar</button>
      </form>
    </div>
  );
};

export default ReservationUserForm;
