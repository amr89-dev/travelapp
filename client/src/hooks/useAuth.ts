import { useAppSelector } from "./reduxHooks";

export const useAuth = () => {
  const isAuth = useAppSelector(
    ({ authReducer }) => authReducer.isAuthenticated
  );
  return isAuth;
};
