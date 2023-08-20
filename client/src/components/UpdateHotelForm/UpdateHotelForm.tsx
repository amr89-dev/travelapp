import { useState } from "react";
import { Hotel, updateHotelFormProps } from "../../types/types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateHotel } from "../../redux/slices/hotel.slice";

const UpdateHotelForm = ({ handleOpen, hotel }: updateHotelFormProps) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Hotel>({
    idHotel: hotel?.idHotel,
    name: hotel?.name,
    address: hotel?.address,
    city: hotel?.city,
    country: hotel?.country,
    description: hotel?.description,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateHotel(formData));
  };
  const formStyles = {
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    label: "block text-gray-700 text-sm font-bold mb-2",
    button:
      "bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
    textArea:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ",
  };
  return (
    <section className="w-[90%] h-96 flex flex-col items-center py-16 px-44 gap-3">
      <h2 className="font-bold text-2xl">Actualizar Información del Hotel</h2>
      <button
        className={formStyles.button}
        onClick={() => {
          handleOpen();
        }}
      >
        cerrar
      </button>
      <form
        className=" flex flex-col items-center justify-center w-screen"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-gray-700  text-2xl m-4 ">
          Crea un nuevo hotel
        </h2>
        <div className=" shadow-2xl rounded-lg   sm:w-1/2 flex flex-col p-4 gap-3">
          <div>
            <label htmlFor="name" className={formStyles.label}>
              Nombre del hotel:
            </label>
            <input
              type="text"
              name="name"
              className={formStyles.input}
              id="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Ingrese el nombre del hotel"
            />
          </div>
          <div>
            <label htmlFor="address" className={formStyles.label}>
              Dirección del hotel:
            </label>
            <input
              type="text"
              name="address"
              className={formStyles.input}
              id="address"
              onChange={handleChange}
              value={formData.address}
              placeholder="Ingrese la dirección del hotel"
            />
          </div>
          <div>
            <label htmlFor="country" className={formStyles.label}>
              Pais del hotel:
            </label>
            <input
              type="text"
              name="country"
              className={formStyles.input}
              id="country"
              onChange={handleChange}
              value={formData.country}
              placeholder="Ingrese el pais del hotel"
            />
          </div>
          <div>
            <label htmlFor="city" className={formStyles.label}>
              Ciudad del hotel:
            </label>
            <input
              type="text"
              name="city"
              className={formStyles.input}
              id="city"
              onChange={handleChange}
              value={formData.city}
              placeholder="Ingrese la ciudad del hotel"
            />
          </div>
          <div>
            <label htmlFor="description" className={formStyles.label}>
              Descripcion del hotel:
            </label>
            <textarea
              className={formStyles.textArea}
              name="description"
              id="description"
              onChange={handleChange}
              value={formData.description}
            />
          </div>
        </div>
        <button className={formStyles.button} type="submit">
          Actualizar
        </button>
      </form>
    </section>
  );
};

export default UpdateHotelForm;
