import { useAppSelector } from "./reduxHooks";

export const useRole = () => {
  const isAdmin = useAppSelector(
    ({ authReducer }) => authReducer.loggedUser.role
  );

  return isAdmin === "admin" ? true : false;
};
