import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth must be inside AuthContextProvider");
  }
  return context;
};

export default useAuth;
