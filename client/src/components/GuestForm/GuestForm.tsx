import { useState } from "react";
import { Guest, UserGender } from "../../types/types";

interface GuestFormProps {
  handleGuestChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  guestData: Guest;
  addGuest: () => void;
  index: number;
  array: string[];
}

const GuestForm = ({
  handleGuestChange,
  guestData,
  addGuest,
  index,
  array,
}: GuestFormProps) => {
  const [guestForm, setguestForm] = useState(false);

  const toggleGuestForm = () => {
    setguestForm(!guestForm);
  };
  const formStyles = {
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    label: "block text-gray-700 text-sm font-bold mb-2",
    button:
      "bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
  };
  return (
    <div className="flex flex-col items-center mb-4">
      <section
        className={`flex flex-col items-center justify-center w-full p-8 pt-3${
          guestForm ? "hidden" : ""
        }`}
      >
        <div className="w-full flex flex-row items-center justify-between">
          <h3 className="font-bold text-gray-700 self-start text-l  my-4 ">
            Datos del huesped
          </h3>
          <p className="font-bold text-gray-700 text-l">{`${index + 1}/${
            array.length
          }`}</p>
        </div>

        <div className="w-full flex flex-row items-center justify-center gap-3 mb-2 ">
          <div className="w-full">
            <label htmlFor="name" className={formStyles.label}>
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              className={formStyles.input}
              id="name"
              onChange={handleGuestChange}
              value={guestData.name}
              placeholder="Ingrese su nombre"
            />
          </div>
          <div className="w-full">
            <label htmlFor="last-name" className={formStyles.label}>
              Apellido:
            </label>
            <input
              type="text"
              name="lastName"
              className={formStyles.input}
              id="last-name"
              onChange={handleGuestChange}
              value={guestData.lastName}
              placeholder="Ingrese su apellido"
            />
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-center gap-3 mb-2">
          <div className="w-full">
            <label htmlFor="email" className={formStyles.label}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              className={formStyles.input}
              id="email"
              onChange={handleGuestChange}
              value={guestData.email}
              placeholder="Ingrese su email"
            />
          </div>
          <div className="w-full">
            <label htmlFor="phone" className={formStyles.label}>
              Telefono:
            </label>
            <input
              type="tel"
              name="phone"
              className={formStyles.input}
              id="phone"
              onChange={handleGuestChange}
              value={guestData.phone}
              placeholder="Ingrese su numero de telefono"
            />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center gap-3 mb-2">
          <div className="w-full">
            <label htmlFor="birthdate" className={formStyles.label}>
              Fecha de nacimiento:
            </label>
            <input
              className={formStyles.input}
              type="date"
              name="birthdate"
              id="birthdate"
              onChange={handleGuestChange}
              value={guestData.birthdate}
              placeholder="Ingrese su fecha de nacimiento"
            />
          </div>
          <div className="w-full">
            <label htmlFor="gender" className={formStyles.label}>
              Sexo:
            </label>
            <div className="flex flex-row gap-2">
              <label>
                <input
                  type="radio"
                  className="mr-1"
                  name="gender"
                  value={UserGender.FEMININE}
                  onChange={handleGuestChange}
                  placeholder="Ingrese su fecha de nacimiento"
                />
                Femenino
              </label>
              <label>
                <input
                  type="radio"
                  className="mr-1"
                  name="gender"
                  value={UserGender.MASCULINE}
                  onChange={handleGuestChange}
                  placeholder="Ingrese su fecha de nacimiento"
                />
                Masculino
              </label>
              <label>
                <input
                  type="radio"
                  className="mr-1"
                  name="gender"
                  value={UserGender.NEUTER}
                  onChange={handleGuestChange}
                  placeholder="Ingrese su fecha de nacimiento"
                />
                Neutro
              </label>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center gap-3 mb-2">
          <div className="w-full">
            <label htmlFor="documentType" className={formStyles.label}>
              Documento de identidad:
            </label>
            <select
              name="documentType"
              id="documentType"
              onChange={handleGuestChange}
              value={guestData.documentType}
              className={formStyles.input}
            >
              <option value="" disabled>
                Tipo de documento
              </option>
              <option value="passport">Pasaporte</option>
              <option value="cedulaCiudadania">Cedula de ciudadania</option>
              <option value="cedulaExtranjeria">Cedulad de extranjeria</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="documentNumber" className={formStyles.label}>
              Numero de documento:
            </label>
            <input
              className={formStyles.input}
              type="text"
              name="documentNumber"
              id="documentNumber"
              onChange={handleGuestChange}
              value={guestData.documentNumber}
              placeholder="Ingrese su numero de documento"
            />
          </div>
        </div>
      </section>
      <button
        className={`${formStyles.button}`}
        onClick={(e) => {
          e.preventDefault();
          addGuest();
          toggleGuestForm();
        }}
      >
        {guestForm ? "Huesped Registrado" : "Registrar Huesped"}
      </button>
    </div>
  );
};

export default GuestForm;
