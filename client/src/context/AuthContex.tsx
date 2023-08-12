import { useContext, createContext, useState } from "react";

type AuthProp = {
  children: React.ReactNode;
};

export const AuthContext = createContext({
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: AuthProp) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const data = {
    isAuthenticated,
    setIsAuthenticated,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
