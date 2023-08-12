import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContex";

const ProtectedRoutes = () => {
  //eslint-disable-next-line
  const isAuth = useAuth().isAuthenticated;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
