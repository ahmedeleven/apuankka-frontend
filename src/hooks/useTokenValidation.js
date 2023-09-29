import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function useTokenValidation() {
  // Define a state variable to store the authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check the token when the component mounts
    const token = Cookies.get("token");

    if (token) {
      // If a token is found, consider the user as logged in
      setIsLoggedIn(true);
    } else {
      // No token found, user is not logged in
      setIsLoggedIn(false);
    }
  }, []); // Run this effect only once when the component mounts

  return {
    isLoggedIn,
    token: Cookies.get("token"),
    username: Cookies.get("username"),
    user_id: Cookies.get("user_id"),
  };
}

export default useTokenValidation;
