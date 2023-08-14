import { useState } from "react";
import Layout from "../Layout/Layout";
import { createUser } from "../../redux/user.slice";
import { useAppDispatch } from "../../hooks/reduxHooks";

type User = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<User>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createUser(formData));
  };
  const formStyles = {
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    label: "block text-gray-700 text-sm font-bold mb-2",
    button:
      "bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
  };
  return (
    <Layout>
      <form
        className=" flex flex-col items-center justify-center "
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-gray-700  text-2xl m-4 ">
          Hazte una cuenta
        </h2>
        <div className=" shadow-2xl rounded-lg w-[90%] sm:w-1/2 flex flex-col p-4 gap-3">
          <div>
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
          <div>
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
            Registrar
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default SignUp;
