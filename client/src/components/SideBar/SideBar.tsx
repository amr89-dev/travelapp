import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <section className=" w-56 h-[calc(100vh_-_64px)] border">
      <nav className="flex flex-col items-center">
        <NavLink
          to="/dashboard/hotel"
          id="hotel"
          className="flex w-full py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white"
        >
          🏨 <p className=" leading-5 font-medium">Hoteles</p>
        </NavLink>
        <NavLink
          to="/dashboard/rooms"
          id="rooms"
          className="flex w-full py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white "
        >
          🛌🏽 <p className=" leading-5 font-medium">Habitaciones</p>
        </NavLink>
        <NavLink
          to="/dashboard/reservations"
          id="reservations"
          className="flex py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white"
        >
          📅 <p className=" leading-5 font-medium">Reservas</p>
        </NavLink>
        <NavLink
          to="/dashboard/favorites"
          id="favs"
          className="flex py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white"
        >
          ⭐<p className=" leading-5 font-medium">Favoritos</p>
        </NavLink>
      </nav>
    </section>
  );
};

export default SideBar;
