import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import UserProfile from "../UserProfile/UserProfile";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useRole } from "../../hooks/useRole";

const NavBar = () => {
  //const dispatch = useAppDispatch();
  const profile = useAppSelector(({ authReducer }) => authReducer.loggedUser);
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const location = useLocation().pathname.slice(1);
  const isAuth = useAuth();
  const isAdmin = useRole();

  /*   const links = [
    { to: "/", name: "Home" },
    { to: "/login", name: "Login" },
  ]; */

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  /*  const navStyles = {
    isActive: "mx-2 font-bold ",
    pending: "mx-2",
  }; */

  return (
    <div className="bg-blue-700  text-white  shadow-lg z-10 w-screen sticky top-0">
      <nav
        className={` max-w-screen-xl flex flex-row items-center mx-auto p-2 justify-between h-16 `}
      >
        {!menuIsOpen ? (
          <button className="md:hidden" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <button className="md:hidden" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        )}
        <Link to="/">
          <div className=" font-bold text-3xl">TravelApp</div>
        </Link>
        {/* <ul
          className={`${
            menuIsOpen
              ? "hidden"
              : "flex flex-col absolute top-16 left-0 w-full"
          }  md:visible md:flex md:static md:flex-row md:w-auto p-2  `}
        >
          {links.map((el, i) => (
            <NavLink
              key={i}
              to={el.to}
              className={({ isActive }) =>
                isActive ? navStyles.isActive : navStyles.pending
              }
            >
              {el.name}
            </NavLink>
          ))}
        </ul> */}
        <ul className="flex flex-row gap-1 items-center ">
          {!isAuth ? (
            <div className="w-[250px] flex flex-row justify-around">
              {location !== "signup" && (
                <Link to="signup">
                  <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-3 border border-white hover:border-transparent rounded">
                    Registrate
                  </button>
                </Link>
              )}
              <Link to="/login">
                <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-3 border border-white hover:border-transparent rounded">
                  Inicia Sesión
                </button>
              </Link>
            </div>
          ) : (
            <ul className="flex flex-row items-center">
              {isAdmin && (
                <li>
                  <Link to="/dashboard">
                    <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-3 border border-white hover:border-transparent rounded">
                      Dashboard
                    </button>
                  </Link>
                </li>
              )}

              <li>
                {/* <Link to="/dashboard">👤</Link> */}
                <UserProfile profile={profile} />
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
