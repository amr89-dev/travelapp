import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserProfileNavBarProps } from "../../types/types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { getAuth, logOut, setSuccess } from "../../redux/slices/auth.slice";

/*eslint-disable */
const UserProfile = ({ profile }: UserProfileNavBarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation().pathname;
  const profilePhoto = "https://source.unsplash.com/random/800x600/?avatar=1";

  const { userDetails } = profile;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleLogOut = () => {
    localStorage.removeItem("userLogged");
    dispatch(getAuth(false));
    dispatch(
      logOut({
        email: "",
        password: "",
        id: "",
        role: "",
      })
    );
    dispatch(setSuccess(false));
    navigate("/");
  };

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, [location]);

  return (
    <div>
      <button
        className="relative flex items-center mx-4 "
        onClick={() => {
          handleToggle();
        }}
      >
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-2 ">
          <img
            src={profilePhoto}
            alt="avatar"
            className=" h-full object-cover object-center rounded-full"
          />
        </div>
      </button>

      <div
        className={`${
          isOpen ? "visible" : "hidden"
        } z-10 fixed top-[64px] right-0 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow`}
      >
        <NavLink to={"/"}>
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-medium truncate"></div>
            {userDetails ? userDetails.name : "Nombre"}
          </div>
        </NavLink>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <button
              type="button"
              onClick={() => {
                handleLogOut();
              }}
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
