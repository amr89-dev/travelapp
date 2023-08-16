import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <section className=" w-72 h-screen border ">
      <nav className="flex flex-col items-center">
        <Link to="">Crear Hoteles</Link>
        <Link to="/">Gestionar Reservas</Link>
      </nav>
    </section>
  );
};

export default SideBar;
