import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../config/config";

async function handleToggleChosen(service_id, user_id, initialIsChosen) {
  // Rename the argument to initialIsChosen
  const token = Cookies.get("token");

  try {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    const checkChosenUrl = `interests/service/${service_id}/user/${user_id}/check/`;

    const response = await api.get(checkChosenUrl);
    const isChosen = response.data.chosen;

    const updateChosenUrl = `interests/service/${service_id}/user/${user_id}/update/`;

    // Determine the new value for 'chosen'
    const newChosenValue = !initialIsChosen;

    const method = "PUT";

    // Send the updated data with 'chosen' set to the new value
    const toggleResponse = await api({
      method,
      url: updateChosenUrl,
      data: {
        chosen: newChosenValue,
      },
    });

    if (toggleResponse.status === 200) {
      return newChosenValue;
    } else {
      console.error("Error toggling interest:", toggleResponse.data);
      return isChosen; // Return the previous value
    }
  } catch (error) {
    // Handle error
    console.error("Error handling interest:", error);
    return false; // Return false in case of an error
  }
}

export default handleToggleChosen;
