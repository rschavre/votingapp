import useAuth from "./useAuth.jsx";

const useLogout = () => {
  const { dispatch } = useAuth();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user.voted");
    dispatch({ type: "LOGOUT" });
  };
    return { logout };
};

export default useLogout;
