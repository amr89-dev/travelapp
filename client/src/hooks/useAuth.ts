import { useSelector } from "react-redux";

export const useAuth = () => {
  const isAuth = useSelector(({ authReducer }) => authReducer.isAuthenticated);
  return isAuth;
};
