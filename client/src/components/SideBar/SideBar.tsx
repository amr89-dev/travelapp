import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation().pathname.slice(11);
  console.log(location);

  return (
    <section className=" w-56 h-[calc(100vh_-_64px)] border">
      <nav className="flex flex-col items-center">
        <NavLink
          to="/dashboard/hotel"
          id="hotel"
          className={`flex w-full py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white ${
            location === "hotel" ? "bg-blue-700 text-white" : ""
          }`}
        >
          🏨 <p className=" leading-5 font-medium">Hoteles</p>
        </NavLink>
        <NavLink
          to="/dashboard/rooms"
          id="rooms"
          className={`flex w-full py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white ${
            location === "rooms" ? "bg-blue-700 text-white" : ""
          }`}
        >
          🛌🏽 <p className=" leading-5 font-medium">Habitaciones</p>
        </NavLink>
        <NavLink
          to="/dashboard/reservations"
          id="reservations"
          className={`flex w-full py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white ${
            location === "reservations" ? "bg-blue-700 text-white" : ""
          }`}
        >
          📅 <p className=" leading-5 font-medium">Reservas</p>
        </NavLink>
      </nav>
    </section>
  );
};

export default SideBar;
