import { useAppSelector } from "./reduxHooks";

export const useRole = () => {
  const isAdmin = useAppSelector(
    ({ authReducer }) => authReducer.loggedUser.userDetails?.role
  );

  return isAdmin === "admin" ? true : false;
};
