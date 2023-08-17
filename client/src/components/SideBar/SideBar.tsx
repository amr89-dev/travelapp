import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <section className=" w-56 h-[calc(100vh_-_64px)] border">
      <nav className="flex flex-col items-center">
        <Link
          to="/"
          className="flex w-full py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white "
        >
          🏨 <p className=" leading-5 font-medium">Hoteles</p>
        </Link>
        <Link
          to="/"
          className="flex py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white"
        >
          📅 <p className=" leading-5 font-medium">Reservas</p>
        </Link>
      </nav>
    </section>
  );
};

export default SideBar;
