import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../config/config";

async function getUserCounts(user_id) {
  const token = Cookies.get("token");

  try {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const serviceResponse = await api.get(`/services/user/${user_id}/count/`);
    const interestResponse = await api.get(`/interests/user/${user_id}/count/`);
    const chosenInterestResponse = await api.get(
      `/interests/user/${user_id}/chosen/count/`
    );

    const serviceCount = serviceResponse.data.service_count;
    const interestCount = interestResponse.data.interest_count;
    const chosenInterestCount = chosenInterestResponse.data.interest_count;

    return { serviceCount, interestCount, chosenInterestCount };
  } catch (error) {
    console.error("Error fetching counts", error);
    return {
      serviceCount: null,
      interestCount: null,
      chosenInterestCount: null,
    };
  }
}

export default getUserCounts;
