import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../config/config";
import axios from "axios";

function useCurrentUserData() {
  // Define a state variable to store the user data
  const [currentUserData, setCurrentUserData] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    // Only fetch user data if the token exists
    if (token) {
      const api = axios.create({
        baseURL: API_BASE_URL,
      });

      api.defaults.headers.common["Authorization"] = `Token ${token}`;

      api
        .get(`current_user/`)
        .then((response) => {
          setCurrentUserData(response.data);
        })
        .catch((error) => {
          console.error("Cannot get user data:", error);
        });
    } else {
      // If there's no token, set currentUserData to null
      setCurrentUserData(null);
    }
  }, [token]); // Run this effect whenever the token changes

  return {
    currentUserData: currentUserData,
  };
}

export default useCurrentUserData;
