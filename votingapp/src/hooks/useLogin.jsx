import { useState } from "react";
import useAuth from "./useAuth.jsx";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuth();
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    //make req
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setError("Something went wrong");
        setIsLoading(false);
      }
      if (response.ok) {
        //save token to local storage
        const data = await response?.json();
        const savedata = { email, token: data.token };
        localStorage.setItem("user", JSON.stringify(savedata));
        dispatch({ type: "LOGIN", payload: savedata });
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  return { login, error, isLoading };
};

export default useLogin;
