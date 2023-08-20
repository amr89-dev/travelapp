import { sideBarProps } from "../../types/types";

const SideBar = ({ handleView }: sideBarProps) => {
  return (
    <section className=" w-56 h-[calc(100vh_-_64px)] border">
      <nav className="flex flex-col items-center">
        <button
          onClick={(e) => {
            handleView(e);
          }}
          id="hotel"
          className="flex w-full py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white "
        >
          🏨 <p className=" leading-5 font-medium">Hoteles</p>
        </button>
        <button
          onClick={(e) => {
            handleView(e);
          }}
          id="rooms"
          className="flex w-full py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white "
        >
          🛌🏽 <p className=" leading-5 font-medium">Habitaciones</p>
        </button>
        <button
          onClick={(e) => {
            handleView(e);
          }}
          id="reservations"
          className="flex py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white"
        >
          📅 <p className=" leading-5 font-medium">Reservas</p>
        </button>
        <button
          onClick={(e) => {
            handleView(e);
          }}
          id="favs"
          className="flex py-4 px-5 justify-start items-center gap-3 self-stretch hover:bg-blue-700 hover:text-white"
        >
          ⭐<p className=" leading-5 font-medium">Favoritos</p>
        </button>
      </nav>
    </section>
  );
};

export default SideBar;
