import { useState, useContext } from "react";
import { Hotel, updateHotelFormProps } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  setErrorHotel,
  setSuccess,
  updateHotel,
} from "../../redux/slices/hotel.slice";
import { HandleOpenContext } from "../../utils/context";
import Swal from "sweetalert2";

const UpdateHotelForm = ({ hotel }: updateHotelFormProps) => {
  const dispatch = useAppDispatch();
  const context = useContext(HandleOpenContext);
  const hotelState = useAppSelector((state) => state.hotelReducer);

  const { error, success } = hotelState;

  const [formData, setFormData] = useState<Hotel>({
    idHotel: hotel?.idHotel,
    name: hotel?.name,
    address: hotel?.address,
    city: hotel?.city,
    country: hotel?.country,
    description: hotel?.description,
    available: hotel?.available,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      available: e.target.value === "true" ? true : false,
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
  if (error?.message) {
    Swal.fire({
      title: "Error!",
      text: `${error?.message}`,
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setErrorHotel(null));
      context?.handleHotelUpdateOpen(undefined);
    });
  } else if (success) {
    Swal.fire({
      title: "Exito!",
      text: `El hotel ha sido actualizado exitosamente`,
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setSuccess(null));
      context?.handleHotelUpdateOpen(undefined);
    });
  }

  return (
    <section className="fixed inset-0 min-h-screen p-8   flex flex-col items-center justify-center bg-white rounded-lg border">
      <form
        className=" flex flex-col items-center justify-center w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-gray-700  text-2xl mt-4">
          Actualizar Información del Hotel
        </h2>
        <div className="  shadow-2xl rounded-lg  w-[50%] flex flex-col p-4 gap-3 mb-3">
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
          <div className="flex flex-row items-center gap-2">
            <div className="w-full">
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
            <div className="w-full">
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
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="w-[70%]">
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
            <div className="flex flex-col w-[30%]">
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
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center">
          <button className={formStyles.button} type="submit">
            Actualizar
          </button>
          <button
            className={formStyles.button}
            onClick={() => {
              context?.handleHotelUpdateOpen(undefined);
            }}
          >
            cerrar
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateHotelForm;
