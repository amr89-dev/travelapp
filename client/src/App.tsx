import "./App.css";
import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Login from "./pages/Login/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import NavBar from "./components/NavBar/NavBar.tsx";
import { gethotels } from "./redux/hotel.slice.ts";
import { useAppDispatch } from "./hooks/reduxHooks.ts";
import HotelForm from "./components/HotelForm/HotelForm.tsx";
import HotelDetail from "./components/HotelDetail/HotelDetail.tsx";

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
            path: "/hotel/:idHotel",
            element: <HotelDetail />,
          },
        ],
      },
    ]);
    return routes;
  };

  useEffect(() => {
    dispatch(gethotels());
  }, []);
  return (
    <>
      <NavBar />
      <AppRouter />
    </>
  );
}

export default App;
