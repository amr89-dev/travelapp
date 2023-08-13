import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = () => {
  //eslint-disable-next-line
  const isAuth = useAuth();
  console.log(useAuth());

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
