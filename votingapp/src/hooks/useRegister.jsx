import { useState } from "react";
import useAuth from "./useAuth.jsx";

const useRegister = () => {
  const [errorReg, setErrorReg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuth();

  const register = async (email, password) => {
    setIsLoading(true);
    setErrorReg(null);

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      console.log("Response Text:", text);

      if (!response.ok) {
        setErrorReg(text);
        setIsLoading(false);
        return false; // Indicate failure
      }

      try {
        const data = JSON.parse(text);
        if (data.email) {
          console.log("Registered successfully:", data.email);
          dispatch({ type: "REGISTER_SUCCESS", payload: data });
          return true; // Indicate success
        } else {
          setErrorReg("Unexpected response format");
          return false;
        }
      } catch (e) {
        console.error("Error parsing response:", text);
        setErrorReg(text);
        return false;
      }
    } catch (error) {
      console.error("Network error:", error.message);
      setErrorReg(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  return { register, errorReg, isLoading };
};

export default useRegister;
