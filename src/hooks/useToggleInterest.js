import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../config/config";

function useToggleInterest(serviceId) {
  const token = Cookies.get("token");

  // Initialize the interest state based on the initial data or API response
  const [isInterested, setIsInterested] = useState(false);

  useEffect(() => {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    // Define the URL for checking the interest status
    const checkInterestUrl = `interests/service/${serviceId}/check_interest`;

    api
      .get(checkInterestUrl)
      .then((response) => {
        setIsInterested(response.data.is_interested);
      })
      .catch((error) => {
        // Handle error
        console.error("Error checking interest:", error);
      });
  }, [serviceId, token]);

  const toggleInterest = () => {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    // Define the URL for toggling interest
    const interestUrl = isInterested
      ? `/interests/service/${serviceId}/delete`
      : `/interests/service/${serviceId}/add`;

    // Determine the HTTP method based on the current interest status
    const method = isInterested ? "DELETE" : "POST";

    api({
      method,
      url: interestUrl,
    })
      .then((response) => {
        if (response.status === 200) {
          setIsInterested(!isInterested);
        } else {
          // Handle error
          console.error("Error toggling interest:", response.data);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error toggling interest:", error);
      });
  };

  return {
    isInterested,
    toggleInterest,
  };
}

export default useToggleInterest;
