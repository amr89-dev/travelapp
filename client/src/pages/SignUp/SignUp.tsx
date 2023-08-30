import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  createUser,
  setError,
  setSuccess,
} from "../../redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { User, UserGender } from "../../types/types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const { error, success } = userState;

  const [formData, setFormData] = useState<User>({
    email: "",
    name: "",
    lastName: "",
    password: "",
    birthdate: "",
    gender: UserGender.NEUTER,
    documentType: "",
    documentNumber: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.showLoading();
    dispatch(createUser(formData));
    setFormData({
      email: "",
      name: "",
      lastName: "",
      password: "",
      birthdate: "",
      gender: UserGender.NEUTER,
      documentType: "",
      documentNumber: "",
      phone: "",
    });
  };
  const formStyles = {
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    label: "block text-gray-700 text-sm font-bold mb-2",
    button:
      "bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
  };

  if (error?.message === "El usuario ya esta registrado") {
    Swal.fire({
      title: "Error!",
      text: `${error.message}`,
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setError(null));
      navigate("/login");
    });
  } else if (error) {
    Swal.fire({
      title: "Error!",
      text: `${error.message}`,
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    });
    dispatch(setError(null));
  } else if (success) {
    Swal.fire({
      title: "Exito!",
      text: `El usuario ha sido creado exitosamente`,
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setSuccess(null));
      navigate("/login");
    });
  }

  return (
    <Layout>
      <form
        className=" flex flex-col items-center justify-center w-screen"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-gray-700  text-2xl m-4 ">
          Hazte una cuenta
        </h2>
        <div className=" shadow-2xl rounded-lg   sm:w-1/2 flex flex-col p-4 gap-3">
          <div className="w-full flex flex-row justify-center items-center gap-3">
            <div className="w-full">
              <label htmlFor="name" className={formStyles.label}>
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                className={formStyles.input}
                id="name"
                onChange={handleChange}
                value={formData.name}
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
                onChange={handleChange}
                value={formData.lastName}
                placeholder="Ingrese su apellido"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className={formStyles.label}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              className={formStyles.input}
              id="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Ingrese su email"
            />
          </div>
          <div>
            <label htmlFor="password" className={formStyles.label}>
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              className={formStyles.input}
              id="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Ingrese una constraseña"
            />
          </div>
          <div>
            <label htmlFor="phone" className={formStyles.label}>
              Telefono:
            </label>
            <input
              type="tel"
              name="phone"
              className={formStyles.input}
              id="phone"
              onChange={handleChange}
              value={formData.phone}
              placeholder="Ingrese su numero de telefono"
            />
          </div>

          <div className="w-full flex flex-row justify-center items-center gap-3">
            <div className="w-full">
              <label htmlFor="birthdate" className={formStyles.label}>
                Fecha de nacimiento:
              </label>
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                onChange={handleChange}
                value={formData.birthdate}
                className={formStyles.input}
              />
            </div>
            <div className="w-full">
              <label htmlFor="gender" className={formStyles.label}>
                Sexo:
              </label>
              <div className="flex flex-row gap-2">
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="gender"
                    value={UserGender.FEMININE}
                    onChange={handleChange}
                    placeholder="Ingrese su fecha de nacimiento"
                  />
                  Femenino
                </label>
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="gender"
                    value={UserGender.MASCULINE}
                    onChange={handleChange}
                    placeholder="Ingrese su fecha de nacimiento"
                  />
                  Masculino
                </label>
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name="gender"
                    value={UserGender.NEUTER}
                    onChange={handleChange}
                    placeholder="Ingrese su fecha de nacimiento"
                  />
                  Neutro
                </label>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row justify-center items-center gap-3">
            <select
              name="documentType"
              id="documentType"
              onChange={handleChange}
              value={formData.documentType}
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

            <input
              type="text"
              name="documentNumber"
              id="documentNumber"
              onChange={handleChange}
              value={formData.documentNumber}
              placeholder="Ingrese su numero de documento"
              className={formStyles.input}
            />
          </div>
          <button className={formStyles.button} type="submit">
            Registrar
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default SignUp;
