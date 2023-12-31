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
import Notfound from "./pages/Notfound/Notfound.tsx";
import { getRooms } from "./redux/slices/room.slice.ts";
import SignUp from "./pages/SignUp/SignUp.tsx";
import HotelDashboard from "./components/HotelDashboard/HotelDashboard.tsx";
import {
  getAuth,
  setLoggedUser,
  setSuccess,
} from "./redux/slices/auth.slice.ts";
import RoomDashboard from "./components/RoomDashboard/RoomDashboard.tsx";
import { loadAllUsers } from "./redux/slices/user.slice.ts";
import ReservationDashboard from "./components/ReservationDashboard/ReservationDashboard.tsx";
import AvailableRooms from "./components/AvailableRooms/AvailableRooms.tsx";
import { loadReservations } from "./redux/slices/reservations.slice.ts";
import ReservationUserForm from "./components/ReservationUserForm/ReservationUserForm.tsx";

function App() {
  const dispatch = useAppDispatch();
  const AppRouter = () => {
    const routes = useRoutes([
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/availablerooms/:id",
        element: <AvailableRooms />,
      },
      {
        path: "/reservation/:id",
        element: <ReservationUserForm />,
      },

      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
            children: [
              {
                path: "/dashboard/hotel",
                element: <HotelDashboard />,
              },
              {
                path: "/dashboard/rooms",
                element: <RoomDashboard />,
              },
              {
                path: "/dashboard/reservations",
                element: <ReservationDashboard />,
              },
            ],
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

  const checkAuth = () => {
    const isLogger = localStorage.getItem("userLogged") || null;

    if (isLogger) {
      const userObject = JSON.parse(isLogger);
      dispatch(setSuccess(true));
      dispatch(getAuth(true));
      dispatch(setLoggedUser(userObject));
    }
  };
  useEffect(() => {
    dispatch(gethotels());
    dispatch(getRooms());
    dispatch(loadAllUsers());
    dispatch(loadReservations());
    checkAuth();
  }, []);
  return (
    <div className="">
      <NavBar />
      <AppRouter />
    </div>
  );
}

export default App;
