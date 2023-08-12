import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData;
  };

  const formStyles = {
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    label: "block text-gray-700 text-sm font-bold mb-2",
    button:
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
  };
  return (
    <form className="flex items-center justify-center">
      <div className="border w-3/4 flex flex-col">
        <label htmlFor="name" className={formStyles.label}>
          Nombre:
        </label>
        <input type="text" className={formStyles.input} id="name" />

        <label htmlFor="last-name" className={formStyles.label}>
          Apellido:
        </label>
        <input type="text" className={formStyles.input} id="last-name" />

        <label htmlFor="email" className={formStyles.label}>
          Email:
        </label>
        <input type="email" className={formStyles.input} id="email" />

        <label htmlFor="password" className={formStyles.label}>
          Contraseña:
        </label>
        <input type="password" className={formStyles.input} id="password" />
        <button
          className={formStyles.button}
          type="submit"
          onSubmit={() => {
            handleSubmit;
          }}
        >
          Registrar
        </button>
      </div>
    </form>
  );
};

export default SignUp;
