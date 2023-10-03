import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../config/config";

async function handleToggleInterest(service_id) {
  const token = Cookies.get("token");

  try {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    // Define the URL for checking the interest status
    const checkInterestUrl = `interests/service/${service_id}/check/`;

    const response = await api.get(checkInterestUrl);
    const isInterested = response.data.is_interested;

    // Define the URL for toggling interest
    const interestUrl = isInterested
      ? `/interests/service/${service_id}/delete/`
      : `/interests/service/${service_id}/add/`;

    // Determine the HTTP method based on the current interest status
    const method = isInterested ? "DELETE" : "POST";

    const toggleResponse = await api({
      method,
      url: interestUrl,
    });

    if (toggleResponse.status === 200) {
      return !isInterested;
    } else {
      // Handle error
      console.error("Error toggling interest:", toggleResponse.data);
      return isInterested; // Return the previous value
    }
  } catch (error) {
    // Handle error
    console.error("Error handling interest:", error);
    return false; // Return false in case of an error
  }
}

export default handleToggleInterest;
