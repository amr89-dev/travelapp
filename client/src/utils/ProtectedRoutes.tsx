import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRole } from "../hooks/useRole";

const ProtectedRoutes = () => {
  //eslint-disable-next-line
  const isAuth = useAuth();
  const isAdmin = useRole();
  //console.log("userIsLogged", useAuth());
  return isAuth && isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
