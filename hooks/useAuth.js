import { useContext } from "react";
import { UserContext } from "../pages/_app";

export const useAuth = () => {
  const { user, token, login, logout, setUser } = useContext(UserContext);

  return { user, token, login, logout, setUser };
};
