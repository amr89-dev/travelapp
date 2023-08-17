import "./App.css";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Login from "./pages/Login/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import NavBar from "./components/NavBar/NavBar.tsx";

function App() {
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
        ],
      },
    ]);
    return routes;
  };
  return (
    <>
      <NavBar />
      <AppRouter />
    </>
  );
}

export default App;
