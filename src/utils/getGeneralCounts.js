import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../config/config";

async function getGeneralCounts() {
  const token = Cookies.get("token");

  try {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const serviceResponse = await api.get(`/services/count/`);
    const serviceAvailableResponse = await api.get(
      `/services/available/count/`
    );

    const serviceCount = serviceResponse.data.service_count;
    const serviceAvailableCount = serviceAvailableResponse.data.service_count;

    return { serviceCount, serviceAvailableCount };
  } catch (error) {
    console.error("Error fetching counts", error);
    return {
      serviceCount: null,
      serviceAvailableCount: null,
    };
  }
}

export default getGeneralCounts;
