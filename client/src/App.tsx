import "./App.css";
import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Login from "./pages/Login/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import NavBar from "./components/NavBar/NavBar.tsx";
import { gethotels } from "./redux/slices/hotel.slice.ts";
import { useAppDispatch } from "./hooks/reduxHooks.ts";
import HotelForm from "./components/HotelForm/HotelForm.tsx";
import HotelDetail from "./components/HotelDetail/HotelDetail.tsx";
import Notfound from "./pages/Notfound/Notfound.tsx";
import RoomForm from "./components/RoomForm/RoomForm.tsx";
import { getRooms } from "./redux/slices/room.slice.ts";

function App() {
  const dispatch = useAppDispatch();
  const AppRouter = () => {
    const routes = useRoutes([
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/signup",
        element: <Login />,
      },
      {
        path: "/",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/create-hotel",
            element: <HotelForm />,
          },
          {
            path: "/:idHotel",
            element: <HotelDetail />,
          },
          {
            path: "/create-room/:idHotel",
            element: <RoomForm />,
          },
        ],
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ]);
    return routes;
  };

  useEffect(() => {
    dispatch(gethotels());
    dispatch(getRooms());
  }, []);
  return (
    <div className="relative">
      <NavBar />
      <AppRouter />
      {/* <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-80 bg-red-500 "></div> */}
    </div>
  );
}

export default App;
