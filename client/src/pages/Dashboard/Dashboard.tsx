import SideBar from "../../components/SideBar/SideBar";
import { Link, Outlet, useLocation } from "react-router-dom";
import HandleOpenProvider from "../../utils/context";

const Dashboard = () => {
  const location = useLocation().pathname;

  return (
    <div className="h-[calc(100vh_-_64px)] flex flex-row ">
      <HandleOpenProvider>
        <SideBar />

        {location.length > 11 ? (
          <Outlet />
        ) : (
          <div className="w-[80%]  flex flex-col items-center">
            <h2 className=" font-bold text-2xl m-16 ">
              Panel de Administrador
            </h2>
            <div className="w-full flex flex-row items-center justify-between p-8">
              <Link
                className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                to="hotel"
              >
                Gestionar Hoteles
              </Link>
              <Link
                className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                to="rooms"
              >
                Gestionar Habitaciones
              </Link>
              <Link
                className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                to="reservations"
              >
                Gestionar Reservas
              </Link>
            </div>
          </div>
        )}
      </HandleOpenProvider>
    </div>
  );
};

export default Dashboard;
