import React, { useState, useEffect } from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import { useParams, useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import InterestCard from "./InterestCard";

function ServicesItem() {
  const { isLoggedIn, token, username, user_id } = useTokenValidation();

  const [service, setService] = useState([]);
  const [interests, setInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { service_id } = useParams();

  const getService = () => {
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    api
      .get(`services/${service_id}/`)
      .then((response) => {
        setService(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Cannot get services:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getService();
  }, []);

  const getInterests = () => {
    setIsLoading(true);
    const api = axios.create({
      baseURL: API_BASE_URL,
    });

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    api
      .get(`interests/service/${service_id}/`)
      .then((response) => {
        setInterests(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Cannot get services:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getInterests();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ServiceCard key={service.id} service={service} isViewed="True" />
            <div className="card">
              {interests?.message
                ? null
                : interests.map((interest) => (
                    <InterestCard key={interest.user.id} interest={interest} />
                  ))}
            </div>
          </div>
        )
      ) : (
        <p>Please log in to access this content.</p>
      )}
    </div>
  );
}

export default ServicesItem;
