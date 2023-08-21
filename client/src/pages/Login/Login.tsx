import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { loginUser, setError, setSuccess } from "../../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const loginState = useAppSelector((state) => state.authReducer);
  const { error, success } = loginState;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    dispatch(loginUser(formData));
    setFormData({
      email: "",
      password: "",
    });
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
      text: `${error.message}`,
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    });
    dispatch(setError(null));
  } else if (success) {
    Swal.fire({
      title: "Exito!",
      text: `Inicio de sesión exitoso`,
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#1d4ed8",
    }).then(() => {
      dispatch(setSuccess(null));
      navigate("/");
    });
  }

  return (
    <Layout>
      <h2>Iniciar Sesion</h2>
      <form
        className=" flex flex-col items-center justify-center w-screen"
        onSubmit={handleSubmit}
      >
        <div className=" shadow-2xl rounded-lg   sm:w-1/2 flex flex-col p-4 gap-3">
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

          <button className={formStyles.button} type="submit">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
