import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Hotel } from "../../types/types";
import {
  createHotel,
  setErrorHotel,
  setSuccess,
} from "../../redux/slices/hotel.slice";
import Swal from "sweetalert2";
import { HandleOpenContext } from "../../utils/context";

const HotelForm = () => {
  const dispatch = useAppDispatch();
  const context = useContext(HandleOpenContext);
  const hotelState = useAppSelector((state) => state.hotelReducer);

  const { error, success } = hotelState;

  const initialState = {
    name: "",
    address: "",
    city: "",
    country: "",
    description: "",
  };
  const [formData, setFormData] = useState<Hotel>(initialState);

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
    Swal.showLoading();

    dispatch(createHotel(formData));
    setFormData(initialState);
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
    });
  } else if (success) {
    Swal.fire({
      title: "Exito!",
      text: `El hotel ha sido creado exitosamente`,
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setSuccess(null));
      context?.handleHotelFormOpen();
    });
  }

  return (
    <article className="fixed inset-0 min-h-screen p-8   flex flex-col items-center justify-center bg-white rounded-lg border">
      <form
        className="  flex flex-col items-center justify-center w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-gray-700  text-2xl m-4 ">
          Crea un nuevo hotel
        </h2>
        <div className=" shadow-2xl rounded-lg  w-[50%] flex flex-col p-4 gap-3 mb-3">
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
              Dirección:
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
                Ciudad:
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
                Pais:
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
        <div className="flex flex-row gap-2 justify-center">
          <button className={formStyles.button} type="submit">
            Registrar
          </button>
          <button
            className={formStyles.button}
            onClick={() => {
              context?.handleHotelFormOpen();
            }}
          >
            Cerrar
          </button>
        </div>
      </form>
    </article>
  );
};

export default HotelForm;
